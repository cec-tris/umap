import { useState, useRef, useMemo, useCallback } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useRoutingContext } from '@/context/RoutingContext'

type markerLatLng = null | LatLngExpression

type DraggableMarkerProps = {
  markerType: "source" | "destination",
  latlng : markerLatLng
}

function DraggableMarker({markerType, latlng} : DraggableMarkerProps) {
    const { updateSource, updateDestination } = useRoutingContext()
    const [draggable, setDraggable] = useState(false)
  
    console.log(latlng) 

    const markerRef = useRef<any>(null)
    const eventHandlers = useMemo(
      () => ({
        dblclick() {
          // alert("dblclick")
          if ( markerType === "source") {
            updateSource(null)
          }
          if ( markerType === "destination") {
            updateDestination(null)
          }
        },
        dragend() {  
          const marker = markerRef.current
          if (marker != null && markerType === "source") {
            const {lat, lng} = marker.getLatLng()
            updateSource({latlng: [lat, lng]})
            console.log(marker.getLatLng())
          }
          if (marker != null && markerType === "destination") {
          }
        },

      }),
      [],
    )

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    if(latlng === null) return null
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={latlng}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
}

export default DraggableMarker