import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import React, { useState } from 'react';
import './Map2.css';

import profile from '../../assets/user.svg'

function MAP(props) {
  let latUser = parseFloat(props.GeoLA) || 0;
  let lngUser = parseFloat(props.GeoLO) || 0;
  let latFriend = parseFloat(props.GeoLA2)
  let lngFriend = parseFloat(props.GeoLO2)
  // const [latUser, setlatUser] = useState(parseFloat(props.GeoLA) || 0)
  // const [lngUser, setlngUser] = useState(parseFloat(props.GeoLO) || 0)
  // const [latFriend, setlatFriend] = useState(parseFloat(props.GeoLA2) || 0)
  // const [lngFriend, setlngFriend] = useState(parseFloat(props.GeoLO2) || 0)

  const [user, setuser] = useState(props.user)
  const [friend, setfriend] = useState(props.friend)


  const google = window.google


  return (
    <>
      <div className='clickDrop'>
        <div className='mapContainer'>
          <Map
            google={props.google}
            zoom={16}
            style={{ height: `100%` }}
            initialCenter={{ lat: latUser, lng: lngUser }}
            center={{ lat: latFriend || latUser, lng: lngFriend || lngUser }}
          >

            {latUser && lngUser &&

              <Marker
                position={{ lat: latUser, lng: lngUser }}
                icon={{
                  url: user && user.profileImg + '#custom_marker',
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(64, 64)
                }}
              />
            }

            {latFriend && lngFriend &&
              <Marker
                position={{ lat: latFriend, lng: lngFriend }}
                icon={{
                  url: friend && friend.profileImg + '#custom_marker' || profile,
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(64, 64)
                }}
              />
            }

          </Map>
        </div>
      </div>
    </>
  );
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyAhCigaQzL1n2Gq6pTfgmcPr-l7P5WqxI0',
})(MAP);
