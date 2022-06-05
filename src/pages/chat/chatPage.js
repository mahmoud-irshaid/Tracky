import React, { useState, lazy } from 'react';
import { useLocation } from 'react-router-dom';
const Footer = lazy(() => import('../../components/footer'))
const Nav = lazy(() => import('../../components/navbar'))
const ChatWith = lazy(() => import('./chatWith'))

const ChatPage = () => {
    const location = useLocation()
    const [friend, setfriend] = useState(location.state.friend)
    const [conv, setconv] = useState(location.state.convId)

    return (
        <>
            <Nav />
            <ChatWith friendo={friend} convId={conv} />
            <Footer />
        </>
    );
}

export default ChatPage;