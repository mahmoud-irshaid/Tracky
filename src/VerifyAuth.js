import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export const VerifyAuth = ({ children }) => {
    const isLogged = useContext(AuthContext).isLogged && localStorage.getItem('RefToken')
    return isLogged ? children : <Redirect to='/welcome' />
}