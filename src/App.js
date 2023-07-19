import React, { useState } from 'react'
import io from "socket.io-client"
import "./App.css"
import Chat from './Chat'

const socket = io.connect("https://deployed-chat-app.herokuapp.com/")

const App = () => {
    const [name, setName] = useState()
    const [roomID, setRoomID] = useState()
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (name !== "" && roomID !== "") {
            socket.emit("join_room", roomID)
        }
        setShowChat(true)
    }
    return (
        <div className='App'>
            {
                !showChat
                    ? (
                        <div div className='joinChatContainer' >
                            <h3>Join A Chat</h3>
                            <input
                                type="text"
                                placeholder='Name here'
                                // value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder='Room ID here'
                                // value={roomID}
                                onChange={e => setRoomID(e.target.value)}
                            />
                            <button onClick={joinRoom}>Join A Room</button>

                        </div >
                    )
                    : (
                        <Chat socket={socket} name={name} roomID={roomID} />
                    )
            }
        </div >
    )
}

export default App