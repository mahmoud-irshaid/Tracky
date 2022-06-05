import React from 'react';
import { Link } from 'react-router-dom';

import Style from './style.module.css'
import logo from '../assets/loc2.svg'

const Footer = () => {

    return (
        <>
            <footer>
                <div className={Style.logo}><a href='/'><img src={logo} loading='lazy' alt='track-logo' /></a></div>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/messages'>Messages</Link></li>
                        <li><Link to='/login'>log out</Link></li>
                    </ul>
                </nav>
                <div className={Style.copy}><a href='https://github.com/mahmoud-irshaid' target='_blank'>© 2022 Copyright by Mahmoud Irshaid</a></div>
            </footer>
        </>
    );
}

export default Footer;