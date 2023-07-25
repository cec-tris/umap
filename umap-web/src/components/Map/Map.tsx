"use client";
import React, { useState, useEffect, useRef } from "react";
import Event from "../MapTools/Event/Event";
import MainMarker from "../MapTools/MapInteraction/MainMarker/MainMarker";
import { MapContainer, ZoomControl, WMSTileLayer, LayersControl, useMapEvents, Polyline } from "react-leaflet";
import './Map.css';
import MarkerElement from "../MapTools/MapInteraction/MarkerElement/MarkerElement";
import PageLoading from "../ForLoading/PageLoading/PageLoading";
import { useAppSelector } from "@/redux/hooks";
const { BaseLayer } = LayersControl;

const redOptions = { 
  color: 'green' 
}

interface MapViewProps {
  interactMode: 'mainMarkerOff' | 'mainMarkerOn'|'filter',
  setInteractMode: any,
  setMainMarkerPosition:any,
  mainMarkerPosition:any,
  addressList:{type:string,list:Array<any>},
  mapRef: any,
  fetchingFilter:any,
}

export default function MapView(props:MapViewProps) {
  const item = useAppSelector(state => state.search.address)
  const select = useAppSelector(state => state.search.select)
  const source = useAppSelector(state => state.routing.source)
  const destination = useAppSelector(state => state.routing.destination)
  const directionsInfor = useAppSelector(state => state.routing.directionInfor)
  const direction = directionsInfor?directionsInfor.map(
    (item: any)=>[item.coors.map((position: any)=>[position[1], position[0]])]
  ):null
  const [directionLine, setDirectionLine] = useState(direction)
  
  const mapRef = useRef<any>(null)
  const [view, setView] = useState<any>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/session/", { method: 'GET' })
        .then(response => response.json())
        .then(result => result)
      if (response.zoom === null || response.center === null) {
        setView({
          center: { lat: 10.879961, lng: 106.810877 },
          zoom: 12
        })
      } else {
        setView({
          center: response.center,
          zoom: response.zoom
        })
      }
    }
    fetchData()
  }, [])

  useEffect(()=>{
    console.log('direction changed')
    setDirectionLine(direction)
  },[directionsInfor])

  return (
    <>
      {
        !view ?
          <PageLoading />
          :
          <MapContainer
            // @ts-ignore
            center={view.center}
            // @ts-ignore
            zoom={view.zoom}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: "100vh", width: "100vw" }}
            ref={props.mapRef}
          >

            <LayersControl>
              <BaseLayer checked name="U-MAP">
                <WMSTileLayer url="https://umap.dientoan.vn/geoserver/ows?" layers='TVtesting:planet_osm_line' />
              </BaseLayer>
              <BaseLayer checked name="OSM">
                <WMSTileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
              </BaseLayer>
            </LayersControl>

            <ZoomControl position="topright" />
            <MainMarker
            mapRef={props.mapRef} interactMode={props.interactMode} 
            setInteractMode={props.setInteractMode} setPosition={props.setMainMarkerPosition}
            position={props.mainMarkerPosition} fetchingFilter={props.fetchingFilter} addressList={props.addressList?.list}/>
            {select && item && <MarkerElement mapRef={mapRef} item={item} type="select"/>}
            {source && source!=="readyToSet" && <MarkerElement mapRef={mapRef} item={source} type="source"/>}
            {destination && destination!=="readyToSet" && <MarkerElement mapRef={mapRef} item={destination} type="destination"/>}
            {directionLine && <Polyline pathOptions={redOptions} positions={directionLine} />}
            <Event/>
          </MapContainer>
      }
    </>
  );
}