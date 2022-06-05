import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Style from '../login/style/style.module.css'
import Style2 from './style/style.module.css'

import Nav from '../../components/navbar';
import Footer from '../../components/footer';
import profile from '../../assets/user.svg'


const Update = () => {
    const { login, user, setuser } = useContext(AuthContext)

    const [logErr, setlogErr] = useState()
    const [logErr2, setlogErr2] = useState()
    const [signUser, setsignUser] = useState({})
    const [chosedImg, setchosedImg] = useState('')




    useEffect(() => {
        setsignUser({
            ...signUser,
            _id: user._id,
            username: user.username,
            pass: '',
            phone: user.phone,
            email: user.email,
            profileImg: user.profileImg,
            prevImg: user.profileImg,
            prevUsername: user.username,
            friends: JSON.stringify(user.friends)

        })
    }, [user])







    const edit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (const i in signUser) {
            formData.append(i, signUser[i])
            console.log(i, signUser[i]);
        }

        axios.put(`${process.env.REACT_APP_API_URL}/updateUser`, formData,
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.parse(localStorage.getItem('user'))
                }
            })
            .then((res) => {
                setuser({
                    ...user,
                    username: signUser.username,
                    phone: signUser.phone,
                    email: signUser.email,
                    profileImg: res.data.profileImg,
                })
                if (res.data.accessToken)
                    login({
                        user: user,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    })
            })
            .catch(err => {
                err.response.data === 'Username is used before' && setlogErr(err.response.data)
                err.response.data === 'File Too Big, Maximum size 5mb' && setlogErr2(err.response.data)

            }
            )
    }


    function logChange(e) {
        setsignUser({ ...signUser, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Nav />

            <div className={Style.container} >
                <h1>Edit Profile</h1>
                <form onSubmit={edit} className={Style.form}>
                    <section className={Style2.setImg}>
                        <img src={chosedImg || user.profileImg && `${user.profileImg}` || profile} alt='profile image'></img>
                        <input type='file' name="profileImg"
                            accept='.png, .jpg, .jpeg'
                            onChange={(e) => {
                                setsignUser({ ...signUser, profileImg: e.target.files[0] })
                                setchosedImg(URL.createObjectURL(e.target.files[0]))
                            }} />
                        {logErr2 && <p className={Style.errMsg}>*{logErr2}</p>}
                    </section>
                    <div>
                        <label>Username :</label>
                        <input type='text' defaultValue={user.username} onChange={(e) => logChange(e)} className={logErr && Style.err} name='username' required />
                        {logErr && <p className={Style.errMsg}>*{logErr}</p>}
                    </div>
                    <div>
                        <label>Password :</label>
                        <input type='text' minLength='8' onChange={(e) => logChange(e)} name='pass' />
                    </div>
                    <div>
                        <label>Email :</label>
                        <input type='email' defaultValue={user.email} onChange={(e) => logChange(e)} name='email' required />
                    </div>
                    <div>
                        <label>Phone :</label>
                        <input type='text' pattern="\d*" maxLength="10" defaultValue={user.phone} onChange={(e) => logChange(e)} name='phone' required />
                    </div>
                    <div>
                        <input type='submit' />
                    </div>
                </form>


                <h2>Friends</h2>
                <section className={Style2.friends}>
                    {user.friends && user.friends.length > 0 ? user.friends.map((friend, count) => (
                        <Link to={{ pathname: `/users/${friend.username}`, state: { user: friend } }} key={count}>
                            <div className={Style2.friend}>
                                <img src={friend.profileImg || profile} loading='lazy' />
                                <div>
                                    <p>{friend.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                        :
                        <center style={{ gridColumn: '2/3' }}>No Friends found</center>
                    }

                </section>
            </div>

            <Footer />
        </>
    );
}

export default Update;