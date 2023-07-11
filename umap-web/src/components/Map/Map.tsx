"use client";
import React, { useRef, useState, useEffect } from "react";
import Event from "../MapTools/Event/Event";
import MainMarker from "../MapTools/MapInteraction/MainMarker/MainMarker";
import { MapContainer, ZoomControl, WMSTileLayer, LayersControl, useMapEvents, Polyline, LayerGroup } from "react-leaflet";
import './Map.css';
import PageLoading from "../ForLoading/PageLoading/PageLoading";
import DraggableMarker from '@/components/Map/DraggableMarker'
import PopupMenu from "./PopupMenu";
import { useRoutingContext } from "@/context/RoutingContext";
import { LatLng, LatLngExpression } from "leaflet";

const { BaseLayer } = LayersControl;

interface MapViewProps {
  interactMode: 'click' | 'filter'|'none',
  setInteractMode: any,
  setShowContextMenu: any,
  setShowFilterMenu: any,
}

export default function MapView({interactMode, setShowContextMenu, setInteractMode, setShowFilterMenu}: MapViewProps) {
  const mapRef = useRef<any>(null)
  const [view, setView] = useState<any>(false)

  const { source, destination } = useRoutingContext()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/session/", { method: 'GET' })
        .then(response => response.json())
        .then(result => result)
      console.log(response)
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
            ref={mapRef}
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
            {/* marker for  */}
            <MainMarker mapRef={mapRef} interactMode={interactMode} 
            setInteractMode={setInteractMode}/> 
            <Event setShowContextMenu={setShowContextMenu} setShowFilterMenu={setShowFilterMenu}/>
            {/* <Polyline   
              positions={[]}
              pathOptions={{ color: 'red' }}
            /> */}
            { source != null && <DraggableMarker markerType="source" latlng={source?.latlng} />}
            { destination != null && <DraggableMarker markerType="destination" latlng={destination?.latlng} />}
            <PopupMenu />
          </MapContainer>
      }
    </>
  );
}