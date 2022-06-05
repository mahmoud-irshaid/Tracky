import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { useLocation, withRouter, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/navbar';

import Style from './style/style.module.css'
import Footer from '../../components/footer';
import profile from '../../assets/user.svg'

const Profile = () => {
    const location = useLocation()
    const history = useHistory()
    const [friend, setfriend] = useState(location.state.user)
    const { login, user, setuser, setLocal } = useContext(AuthContext)
    const [isFriend, setisFriend] = useState()

    useEffect(() => {
        if (user.friends.find(x => x._id === friend._id)) setisFriend(0)
        else if (user.friendsReqSent.find(x => x._id === friend._id)) setisFriend(1)
        else setisFriend(2)
    }, [])

    function addFriend() {
        axios.put(`${process.env.REACT_APP_API_URL}/addFriend`,
            {
                friend: friend,
                userId: { _id: user._id, username: user.username, phone: user.phone, profileImg: user.profileImg },
            },
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.parse(localStorage.getItem('user'))
                }
            }
        ).then(res => {
            if (res.data.accessToken)
                login({
                    user: user,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                })
            let newReqs = user.friendsReqSent
            newReqs.push(friend)

            const newUser = Object.assign(user, { friendsReqSent: newReqs })
            setuser(newUser)
            setLocal()
            setisFriend(1)
        })
            .catch(err => console.log(err))
    }





    function cancelReq() {
        axios.post(`${process.env.REACT_APP_API_URL}/cancelReqSent`,
            {
                friend,
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

                const newUser = Object.assign(user, { friendsReqSent: user.friendsReqSent.filter(target => (target._id !== friend._id)) })
                setuser(newUser)
                setLocal()
                setisFriend(2)
            })
    }





    function deleteFriend() {
        if (window.confirm("Are you sure to delete this friend ?")) {
            axios.put(`${process.env.REACT_APP_API_URL}/deleteFriend`,
                {
                    friend: friend,
                    userId: { _id: user._id, username: user.username, phone: user.phone, profileImg: user.profileImg },
                },
                {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                        "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                        "user": JSON.parse(localStorage.getItem('user'))
                    }
                }
            ).then(res => {
                if (res.data.accessToken)
                    login({
                        user: user,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    })
                let newFriends = user.friends.filter(target => target._id !== friend._id)

                const newUser = Object.assign(user, { friends: newFriends })
                setuser(newUser)
                setLocal()
                setisFriend(2)
            })
                .catch(err => console.log(err))
        }
    }









    async function startConv() {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/getConvId`, { user1: user._id, user2: friend._id });
            newConv(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function newConv(conversation) {
        if (conversation) {
            history.push({ pathname: `/Messages/${friend.username}`, state: { convId: conversation, friend } })
        }
        else {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/newConv`, {
                    senderId: user._id,
                    receiverId: friend._id
                });
                history.push({ pathname: `/Messages/${friend.username}`, state: { convId: res, friend } })
            } catch (err) {
                console.log(err);
            }
        }
    }


    return (


        user._id === friend._id ? <Redirect to='/profile' />
            :
            <>

                <Nav />


                <div className={Style.container}>
                    <div className={Style.setImg}>
                        <img src={friend.profileImg || profile} loading='lazy' alt={friend.username}></img>
                    </div>
                    <div>
                        <h2>{friend.username}</h2>
                    </div>
                    <div>
                        <label>{friend.phone}</label>
                    </div>


                    <section>

                        {isFriend === 0 &&
                            <div>
                                <button onClick={deleteFriend} className={Style.unfriend}>
                                    Friend
                                </button>
                            </div>
                        }
                        {isFriend === 1 &&
                            <div>
                                <button onClick={cancelReq} className={`${Style.unfriend} ${Style.unsent}`}>
                                    Request sent
                                </button>
                            </div>
                        }
                        {isFriend === 2 &&
                            <div>
                                <button onClick={addFriend}>
                                    Add friend +
                                </button>
                            </div>
                        }


                        <div>
                            <button onClick={startConv}>
                                message
                            </button>
                        </div>
                    </section>

                </div>
                <Footer />
            </>
    );
}

export default withRouter(Profile);