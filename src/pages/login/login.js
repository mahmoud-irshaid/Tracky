import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'
import axios from 'axios'
import Style from './style/style.module.css'
import Footer from '../../components/footer';
import logo from '../../assets/loc2.svg'
import txt from '../../assets/tracky.svg'


const LogIn = () => {
    const [logErr, setlogErr] = useState()
    const [logErr2, setlogErr2] = useState()
    const [logUser, setlogUser] = useState({
        username: '',
        pass: '',
    })

    const { login, logout } = useContext(AuthContext)

    let history = useHistory()

    useEffect(() => {
        logout()
    }, [])


    function log(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/getUser`, { logUser })
            .then(res => {
                if (res.data.refreshToken && res.data.accessToken && res.data.user) {
                    login(res.data)
                    history.push('/')
                }
            })
            .catch(err => {
                err.response.data === 'Username not found' && setlogErr(err.response.data)
                err.response.data === 'Wrong Password' && setlogErr2(err.response.data)
            })
    }


    function logChange(e) {
        setlogUser({ ...logUser, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div style={{ padding: '1em' }}>
                <img src={logo} className={Style.logo} loading='lazy' alt='tracky-logo' />
                <img src={txt} className={Style.logo2} loading='lazy' alt='tracky-logo' />
            </div>
            <main>
                <div className={`${Style.container} ${Style.log}`}>
                    <h1>Log In</h1>
                    <form onSubmit={log} className={Style.form}>
                        <div>
                            <label>Username :</label>
                            <input type='text' onChange={(e) => logChange(e)} className={logErr && Style.err} name='username' required />
                            {logErr && <p className={Style.errMsg}>*{logErr}</p>}
                        </div>
                        <div>
                            <label>Password :</label>
                            <input type='password' minLength='8' onChange={(e) => logChange(e)} className={logErr2 && Style.err} name='pass' required />
                            {logErr2 && <p className={Style.errMsg}>*{logErr2}</p>}
                        </div>
                        <div>
                            <input type='submit' />
                        </div>
                    </form>
                    <div className={Style.second}>
                        <p>don't have an account ?</p>
                        <a href='/signin'><button>Sign up</button></a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default LogIn;