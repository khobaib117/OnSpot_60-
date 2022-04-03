/*global google*/
import {
  withGoogleMap,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Maps.css";
import { yellow } from "@mui/material/colors";
const google = window.google ? window.google : {};

export const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
    padding: "400px 500px",
    margin: "40px 40px",
  };
  const geoLocation = () => {
    navigator.geolocation.getCurrentPosition(success);
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };
  const stores = [
    {
      position: { lat: 33.52270681657565, lng: 73.15817862892969 },
      name: "Outfitters",
      title: "Outfitters Outlet",
    },
    {
      position: { lat: 33.593920549831346, lng: 73.05559115491275 },
      name: "Cougar",
      title: "Cougar Outlet",
    },
    {
      position: { lat: 33.63844106208739, lng: 73.07352001073643 },
      name: "Breakout",
      title: "Breakout Outlet",
    },
    {
      position: { lat: 33.63848363591611, lng: 73.07387815491406 },
      name: "One",
      title: "One Outlet",
    },
    {
      position: { lat: 33.52270681657565, lng: 73.15817862892969 },
      name: "Furor",
      title: "Furor Outlet",
    },
    {
      position: { lat: 33.59588154151884, lng: 73.05447384141938 },
      name: "Gul Ahmed",
      title: "Gul Ahmed Outlet",
    },
    {
      position: { lat: 33.63906133525674, lng: 73.07275805306544 },
      name: "Khadi",
      title: "Khadi Outlet",
    },
    {
      position: { lat: 33.63879177425777, lng: 73.07191829539438 },
      name: "Bonanza",
      title: "Bonanza Outlet",
    },
    {
      position: { lat: 33.690068492560954, lng: 73.03105863957359 },
      name: "Levis",
      title: "Levis Outlet",
    },
  ];
  // var icon = {
  //     url: "http://cdn.onlinewebfonts.com/svg/img_550774.png", // url
  //     scaledSize: new google.maps.Size(50, 50), // scaled size
  //     origin: new google.maps.Point(0,0), // origin
  //     anchor: new google.maps.Point(0, 0) // anchor
  // };
  // useEffect(() => {
  //     getLoc()
  // }, [])

  const getLoc = async () => {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.6462725,73.0310777&radius=10000&type=coffee&sensor=true&key=AIzaSyCY3DqKYDRFMcpNcqkz51mDjOZQ7tqJNjY"
    );
    console.log(res);
  };
  return (
    <div className="main_container">
      <div className="inner_container">
        {Object.keys(currentPosition).length === 0 ? (
          <div>
            <button
              style={{ padding: "20px 40px", borderRadius: "10px" }}
              onClick={() => geoLocation()}
            >
              Locate nearby stores
            </button>
          </div>
        ) : (
          <div>
            <LoadScript googleMapsApiKey="AIzaSyCeFBsVXkUOZMS-q9UHRe294UaztxZMxI8">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                query="Museum of Contemporary Art Australia"
                fields="geometry"
                center={currentPosition}
              >
                {currentPosition.lat ? (
                  <>
                    <Marker
                      position={currentPosition}
                      // onDragEnd={(e) => onMarkerDragEnd(e)}
                      // draggable={true}
                      // icon={{

                      //     fillColor: '#34495e',
                      //     fillOpacity: 1
                      // }}
                      fillColor="#0000FF"
                      style={{
                        backgroundColor: "#0000ff",
                        fillColor: "#0000ff",
                        strokeColor: "0000ff",
                      }}
                    />
                    {stores.map((item) => (
                      <Marker
                        position={item.position}
                        title={item.title}
                        name={item.name}
                        // onDragEnd={(e) => onMarkerDragEnd(e)}
                        // draggable={true}
                      />
                    ))}
                  </>
                ) : null}
              </GoogleMap>
            </LoadScript>
          </div>
        )}
      </div>
    </div>
  );
};
