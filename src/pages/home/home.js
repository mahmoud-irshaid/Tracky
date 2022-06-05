import React, { useContext, useState, useEffect, useRef, useReducer, lazy } from 'react';
import { AuthContext } from '../../AuthContext'
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";

import Style from './style/style.module.css'
import profile from '../../assets/user.svg'
const Nav = lazy(() => import('../../components/navbar'))
const Footer = lazy(() => import('../../components/footer'))
const MAP = lazy(() => import('../track/map'))


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




const Home = () => {
  const { user, trackConnected, settrackConnected } = useContext(AuthContext)
  const [OnlineUsers, setOnlineUsers] = useState([])
  const [request, setrequest] = useState()

  const [lat, dispatch] = useReducer(reducer, 0);
  const [lon, dispatch2] = useReducer(reducer2, 0);

  const socket = useRef();



  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_TRACK_API}`, { transports: ['websocket'], upgrade: false });
    settrackConnected(true)
    socket.current.on("getMessage", (data) => {
    });
    socket.current.on("getReq", (data) => {
      setrequest(data)
    });
  }, []);


  useEffect(() => {
    if (trackConnected)
      window.location.reload()
  }, [])



  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.friends.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user]);




  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(pos => {
        dispatch({ type: 'lat', payload: pos.coords.latitude })
        dispatch2({ type: 'lon', payload: pos.coords.longitude })
      })
    }
  }, [])


  return (
    <>
      <Nav />

      <main>

        <MAP
          GeoLA={lat.lat}
          GeoLO={lon.lon}
          user={user}
        />
      </main>
      <div className={Style.onlineUsers}>
        {OnlineUsers.length > 0 &&
          OnlineUsers.map((on, count) => (
            <div className={Style.onUser} key={count}>
              <Link to={{ pathname: `/track/${on.username}`, state: { user: on } }}>
                <section>
                  <img src={on.profileImg || profile} className={request && request.user === on._id && Style.request} loading='lazy' alt={on.username} />
                </section>
              </Link>
              <div className={Style.nameHover}>{on.username}</div>
            </div>
          ))
        }
      </div>

      <Footer />
    </>
  );
}

export default Home;
