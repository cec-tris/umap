'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchBox from "@/components/MapTools/SearchBox/SearchBox"
import DirectionBox from "@/components/MapTools/DirectionBox/DirectionBox"
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("@/components/Map/Map"), { ssr: false });
import { AnimatePresence } from "framer-motion";
import ContextMenu from "@/components/MapTools/MapInteraction/ContextMenu/ContextMenu";
import FilterMenu from "@/components/MapTools/MapInteraction/FilterMenu/FilterMenu";
// Bootstrap Stuffs
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useAppSelector } from "@/redux/hooks";

//-------------------------------------------------------------------------------------------------------------------

export default function Home() {
  const [showDirectionBox, setShowDirectionBox] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
  const [interactMode, setInteractMode] = useState<'mainMarkerOff' | 'filter' | 'mainMarkerOn'>('mainMarkerOff');
  const [mainMarkerPosition, setMainMarkerPosition] = useState<any>([]);
  const [addressList, setAddressList] = useState<any>([]);
  const [fetchingFilter, setFetchingFilter] = useState<false | number>(false);
  const mapRef = useRef<any>(null)
  // for sourcePoint and destinationPoint
  const { source, destination } = useAppSelector(state => state.routing)

  const MapviewProps = {
    interactMode,
    setInteractMode,
    setMainMarkerPosition,
    mainMarkerPosition,
    addressList,
    mapRef,
    fetchingFilter,
  };

  const ContextMenuProps = {
    show: showContextMenu,
    setShow: setShowContextMenu,
    setShowFilterMenu,
    setInteractMode,
    interactMode,
    position: menuPosition,
    setPosition: setMenuPosition,
  };

  const FilterMenuProps = {
    show: showFilterMenu,
    setShow: setShowFilterMenu,
    setShowContextMenu: setShowContextMenu,
    setInteractMode,
    interactMode,
    position: menuPosition,
    setPosition: setMenuPosition,
    setAddressList,
    mainMarkerPosition,
    mapRef,
    fetchingFilter,
    setFetchingFilter,
  };

  const handleSearchDirection = useCallback(() => {
    setShowDirectionBox(true);
  }, []);

  const handleSearchCancel = useCallback(() => {
    setShowDirectionBox(false);
  }, []);


  useEffect(() => {
    // right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setMenuPosition({ top: e.clientY, left: e.clientX });
      setShowContextMenu(true);
      setShowFilterMenu(false);
      setAddressList([]);
      if (interactMode !== 'mainMarkerOff')
        setInteractMode('mainMarkerOn');
    }
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    }
  }, [interactMode])

  useEffect(() => {
    function dispatch() {
      // fake click event
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: menuPosition.left,
        clientY: menuPosition.top
      });
      // leaflet-container dispatch
      document.getElementsByClassName('leaflet-container')[0].dispatchEvent(event);
    }
    if (source === "readyToSet" || destination === "readyToSet") {
      dispatch();
    }
  }, [source, destination])

  console.log("app rerender")

  return (
    <div className="relative">
      <div className="absolute" style={{ zIndex: 10000 }}>
        <AnimatePresence mode='wait'>
          {showDirectionBox &&
            <DirectionBox onDirectionCancel={handleSearchCancel} />
          }
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          {!showDirectionBox &&
            <SearchBox onSearchDirection={handleSearchDirection} />
          }
        </AnimatePresence>
      </div>
      <MapView {...MapviewProps} />
      {
        showContextMenu &&
        <ContextMenu {...ContextMenuProps} />
      }
      {
        showFilterMenu &&
        <FilterMenu {...FilterMenuProps} />
      }
    </div>
  )
}