import React, { } from 'react';
import { useHistory } from 'react-router-dom';
import Style from './style/style.module.css'

import profile from '../../assets/user.svg'

const Conversation = ({ convId, friend }) => {
    const history = useHistory()

    return (
        <>
            <div className={Style.conversation} onClick={() => {
                history.push({ pathname: `/Messages/${friend.username}`, state: { convId, friend } })
            }}>
                <img src={friend.profileImg || profile} loading='lazy' />
                <p>{friend && friend.username}</p>
            </div>
        </>
    );
}

export default Conversation;