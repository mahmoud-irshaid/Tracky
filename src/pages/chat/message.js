import React from 'react';
import { format } from "timeago.js";
import ChatCss from './style/style.module.css'
import profile from '../../assets/user.svg'

export default function Message({ message, own, owner }) {
  return (
    <div className={own ? ChatCss.messageOwn : ChatCss.message}>
      <div className={ChatCss.messageTop}>
        <img
          className={ChatCss.messageImg}
          src={owner.profileImg && `${owner.profileImg}` || profile}
          alt={owner.username}
          loading='lazy'
        />
        <p className={ChatCss.messageText}>{message.text}</p>
      </div>
      <div className={ChatCss.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}