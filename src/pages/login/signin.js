import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'
import axios from 'axios'
import Style from './style/style.module.css'
import Footer from '../../components/footer';
import logo from '../../assets/loc2.svg'
import txt from '../../assets/tracky.svg'


const SignIn = () => {

    const [logErr, setlogErr] = useState()
    const [signUser, setsignUser] = useState({
        username: '',
        pass: '',
        email: '',
        phone: '',
        profileImg: ''
    })

    const { login, logout } = useContext(AuthContext)

    let history = useHistory()

    useEffect(() => {
        logout()
    }, [])


    function log(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/newUser`, { signUser })
            .then(res => {
                if (res.data.refreshToken && res.data.accessToken && res.data.user) {
                    login(res.data)
                    history.push('/')
                }
            })
            .catch(err => err.response.data === 'Username is used before' && setlogErr(err.response.data))
    }


    function logChange(e) {
        setsignUser({ ...signUser, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div style={{ padding: '1em' }}>
                <img src={logo} className={Style.logo} loading='lazy' alt='tracky-logo' />
                <img src={txt} className={Style.logo2} loading='lazy' alt='tracky-logo' />
            </div>
            <main>
                <div className={`${Style.container}`}>
                    <h1>Sign Up</h1>
                    <form onSubmit={log} className={Style.form}>
                        <div>
                            <label>Username :</label>
                            <input type='text' onChange={(e) => logChange(e)} name='username' className={logErr && Style.err} required />
                            {logErr && <p className={Style.errMsg}>*{logErr}</p>}
                        </div>
                        <div>
                            <label>Password :</label>
                            <input type='text' minLength='8' onChange={(e) => logChange(e)} name='pass' />
                        </div>
                        <div>
                            <label>Email :</label>
                            <input type='email' onChange={(e) => logChange(e)} name='email' required />
                        </div>
                        <div>
                            <label>Phone :</label>
                            <input type='text' pattern="\d*" maxLength="10" onChange={(e) => logChange(e)} name='phone' />
                        </div>
                        <div>
                            <input type='submit' />
                        </div>
                    </form>
                    <div className={Style.second}>
                        <p>already have an account ?</p>
                        <a href='/login'><button>Log in</button></a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SignIn;