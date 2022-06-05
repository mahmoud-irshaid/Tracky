import React, { useState, useEffect, useRef, useReducer, useContext, lazy } from 'react';
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { io } from "socket.io-client";
import axios from 'axios';
import Style from '../home/style/style.module.css'

const Nav = lazy(() => import('../../components/navbar'))
const Footer = lazy(() => import('../../components/footer'))
const MAP = lazy(() => import('../track/map'))
const ChatWith = lazy(() => import('../chat/chatWith'))


// reducers

const reducer = (lat, action) => {
  switch (action.type) {
    case 'lat':
      return { lat: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const reducer2 = (lon, action) => {
  switch (action.type) {
    case 'lon':
      return { lon: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};



function Track() {
  const location = useLocation()
  const [friend, setfriend] = useState(location.state.user)
  const { user, trackConnected, settrackConnected } = useContext(AuthContext)

  const socket = useRef();
  const [ariv, setariv] = useState({})
  const [lat, dispatch] = useReducer(reducer, 0);
  const [lon, dispatch2] = useReducer(reducer2, 0);
  const [conv, setconv] = useState()


  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_TRACK_API}`, { transports: ['websocket'], upgrade: true });
    settrackConnected(true)
    socket.current.on("getMessage", (data) => {
      setariv({ lat: data.lat, lon: data.lon })
    });


    socket.current.emit("sendReq", {
      user: user._id, rec: friend._id
    })
  }, []);


  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => { })
  });




  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(pos => {
        dispatch({ type: 'lat', payload: pos.coords.latitude })
        dispatch2({ type: 'lon', payload: pos.coords.longitude })

        socket.current.emit("sendMessage", {
          user: user._id, rec: friend._id, lat: pos.coords.latitude, lon: pos.coords.longitude
        });
      })
    }
  }, [])




  useEffect(() => {
    if (trackConnected)
      window.location.reload()
  }, [])




  useEffect(() => {
    async function getConvId() {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/getConvId`, { user1: user._id, user2: friend._id })
      setconv(res.data);
    }
    getConvId()
  }, [])


  return (
    <>
      <Nav />

      <main>
        <MAP
          GeoLA={lat.lat}
          GeoLO={lon.lon}
          GeoLA2={ariv.lat}
          GeoLO2={ariv.lon}
          user={user}
          friend={friend}
        />
      </main>

      <div className={Style.chatSwipper}>
        <ChatWith friendo={friend} convId={conv} />
      </div>
      <Footer />
    </>
  );
}

export default Track;
