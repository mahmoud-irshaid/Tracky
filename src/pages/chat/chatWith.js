import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'
import axios from 'axios';
import { io } from "socket.io-client";
import Message from './message';
import Style from './style/style.module.css'

import profile from '../../assets/user.svg'
import send from '../../assets/send.svg'

const ChatWith = React.memo(({ friendo, convId }) => {
    const { user, chatConnected, setchatConnected } = useContext(AuthContext)

    const socket = useRef();
    const [friend, setfriend] = useState(friendo._id)
    const [conv, setconv] = useState()

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const [owner, setowner] = useState(friendo);
    const scrollRef = useRef();




    useEffect(() => {
        if (chatConnected)
            window.location.reload()
    }, [])


    useEffect(() => {
        convId && setconv(convId._id)
    }, [convId])


    useEffect(() => {
        socket.current = io(`${process.env.REACT_APP_CHAT_API}`, { transports: ['websocket'], upgrade: true });
        setchatConnected(true)
        socket.current.on("getMessage", (data) => {
            setarrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: data.createdAt,
            });
        });
    }, []);


    useEffect(() => {
        arrivalMessage &&
            // currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => { })
    }, [user]);




    // get msgs

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/getMsg/${conv}`);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [conv])


    // new msg

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage) {
            const message = {
                sender: user._id,
                text: newMessage,
                conversationId: conv,
                createdAt: Date.now()
            };



            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId: friendo._id,
                text: newMessage,
                createdAt: Date.now()
            });

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/addMsg/`, { message });
                setMessages([...messages, res.data]);
                setNewMessage("");
            } catch (err) {
                console.log(err);
            }
        }
    };






    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);







    return (
        <>

            {conv && (
                <div className={Style.messenger}>
                    <div className={Style.chatBoxTop}>
                        <section>
                            <Link to={{ pathname: `/users/${friendo.username}`, state: { user: friendo } }}>
                                <img src={friendo.profileImg || profile} loading='lazy' />
                                <span>{friendo.username}</span>
                            </Link>
                        </section>
                        <div className={Style.messages}>
                            {messages.map((m, count) => (
                                <div ref={scrollRef} key={count}>
                                    <Message message={m} own={m.sender === user._id} owner={m.sender === user._id ? user : owner} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={Style.chatBoxBottom}>
                        <textarea
                            className={Style.chatMessageInput}
                            placeholder="write something..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        ></textarea>
                        <button className={Style.chatSubmitButton} onClick={handleSubmit}>
                            <img src={send} alt="send" loading='lazy' />
                        </button>
                    </div>
                </div>
            )}







        </>
    );
})

export default ChatWith;