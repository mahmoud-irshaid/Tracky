import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../AuthContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import Style from './style.module.css'
import logo from '../assets/loc2.svg'
import mag from '../assets/search.svg'
import profile from '../assets/user.svg'
import logout from '../assets/logout.svg'
import request from '../assets/request.svg'
import message from '../assets/message.svg'
import menu from '../assets/menu.svg'
import close from '../assets/close.svg'


const Nav = () => {
    const { login, user, setuser, setLocal } = useContext(AuthContext)
    const [search, setsearch] = useState([])
    const [showReq, setshowReq] = useState(false)
    const [showProfile, setshowProfile] = useState(false)
    const [showMenu, setshowMenu] = useState(true)

    const Navmenu = useRef()



    function findUser(e) {
        axios.post(`${process.env.REACT_APP_API_URL}/findUser`, { user: e.target.value })
            .then(res => {
                setsearch(res.data)
            })
    }





    function acceptReq(req) {
        axios.post(`${process.env.REACT_APP_API_URL}/acceptReq`,
            {
                friend: req,
                userId: { _id: user._id, username: user.username, phone: user.phone, profileImg: user.profileImg },
            },
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.parse(localStorage.getItem('user'))
                }
            })
            .then(res => {
                if (res.data.accessToken)
                    login({
                        user: user,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    })


                let newfriends = user.friends
                newfriends.push(req)

                const newUser = Object.assign(user, {
                    friendsReq: user.friendsReq.filter(target => (target._id !== req._id)),
                    friends: newfriends
                })
                setuser(newUser)
                setLocal()
            })
    }






    function cancelReq(req) {
        axios.post(`${process.env.REACT_APP_API_URL}/cancelReq`,
            {
                friend: req,
                userId: { _id: user._id, username: user.username, phone: user.phone, profileImg: user.profileImg },
            },
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.parse(localStorage.getItem('user'))
                }
            })
            .then(res => {
                if (res.data.accessToken)
                    login({
                        user: user,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    })

                const newUser = Object.assign(user, { friendsReq: user.friendsReq.filter(target => (target._id !== req._id)) })
                setuser(newUser)
                setLocal()
            })
    }


    return (
        <>
            <header>
                <div className={Style.logo}><a href='/'><img src={logo} loading='lazy' alt='tracky-logo' /></a></div>


                <div className={Style.search}>
                    <main>
                        <img src={mag} loading='lazy' alt='search' />
                        <input type='text' onChange={(e) => findUser(e)} placeholder='find a friend ...' />
                        {search && search.length > 0 && <div className={Style.searchRes}>
                            {search.map((data, count) => (
                                <div key={count}><Link to={{ pathname: `/users/${data.username}`, state: { user: data } }}>{data.username}</Link></div>
                            ))}
                        </div>}
                    </main>
                </div>

                <section ref={Navmenu}>

                    <div className={`${Style.req}`} onClick={() => setshowReq(!showReq)}>
                        <a>
                            <div className={`${user.friendsReq.length > 0 && Style.notify}`} >
                                <img src={request} loading='lazy' alt='friend-requests' />
                            </div>
                            <p className={Style.menuText}>frind Requests</p>
                        </a>
                        {showReq && <div className={Style.showReq}>
                            {user.friendsReq && user.friendsReq.length > 0 &&
                                user.friendsReq.map((req, count) => (
                                    <div key={count}>
                                        <Link to={{ pathname: `/users/${req.username}`, state: { user: req } }}>
                                            <img src={req.profileImg || profile} loading='lazy' alt={req.username} />
                                            <span>{req.username}</span>
                                        </Link>
                                        <button onClick={() => acceptReq(req)}>accept</button>
                                        <button onClick={() => cancelReq(req)}>cancel</button>
                                    </div>
                                ))}
                        </div>
                        }
                    </div>


                    <div className={Style.links}><a href='/messages'>
                        <img src={message} loading='lazy' alt='messages' />
                        <p className={Style.menuText}>Messages</p>
                    </a></div>

                    <div className={`${Style.req} ${showProfile && Style.prof}`} onClick={() => setshowProfile(!showProfile)}>
                        <a >
                            <img src={user.profileImg || profile} style={{ borderRadius: '5em' }} loading='lazy' alt={user.username} />
                            <p className={Style.menuText}>Profile</p>
                        </a>
                        {showProfile && <div className={Style.showReq}>
                            <div>
                                <Link to='/profile'>
                                    <img src={profile} loading='lazy' alt='profile' />
                                    <span>Profile</span>
                                </Link>
                            </div>
                            <div>
                                <Link to='/login'>
                                    <img src={logout} loading='lazy' alt='logout' />
                                    <span>Log out</span>
                                </Link>
                            </div>
                        </div>
                        }
                    </div>
                </section>

                <div className={`${Style.links} ${Style.ham}`} onClick={(e) => {
                    if (showMenu) {
                        Navmenu.current.style.display = 'flex'
                        setshowMenu(!showMenu)
                        e.target.src = close
                    } else {
                        Navmenu.current.style.display = 'none'
                        setshowMenu(!showMenu)
                        e.target.src = menu
                    }
                }}><a><img src={menu} loading='lazy' alt='menu' /> </a> </div>

            </header>
        </>);
}

export default Nav;