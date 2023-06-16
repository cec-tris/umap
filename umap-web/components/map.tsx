"use client";
import React ,{ useState} from "react";
import { MapContainer, TileLayer , ZoomControl} from "react-leaflet";
import './map.css';
import { LatLngLiteral } from "leaflet";
export default function ViewMap(){
    const [center, setCenter] = useState<LatLngLiteral>({lat:10.879961,lng:106.810877});
    const ZOOM_LEVEL = 9;
    return (
        <>
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          scrollWheelZoom={true}
          zoomControl = {false} 
          style={{height:"100vh",width:"100vw"}}
        >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <ZoomControl position="topright" />
        </MapContainer>
        </>
      );
}