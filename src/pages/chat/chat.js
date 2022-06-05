import React, { useContext, useEffect, useState, lazy } from 'react';
import { AuthContext } from '../../AuthContext'
import axios from 'axios';
import Style from './style/style.module.css'

const Conversation = lazy(() => import('./conversation'))
const Nav = lazy(() => import('../../components/navbar'))
const Footer = lazy(() => import('../../components/footer'))


const Chat = () => {
    const { user } = useContext(AuthContext)

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/getConv/${user._id}`);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [])



    function findFriend(members) {
        let id
        members[0] === user._id ? id = members[1] : id = members[0]
        return user.friends.filter(fri => fri._id === id)[0]
    }


    return (
        <>
            <Nav />
            <div className={Style.chats}>
                <h2>Chats</h2>
                {conversations && conversations.length > 0 ? conversations.map((con, count) => (
                    <Conversation convId={con} friend={findFriend(con.members)} key={count} />
                ))
                    :
                    <center>No Chats Found</center>
                }
            </div>
            <Footer />
        </>
    );
}

export default Chat;