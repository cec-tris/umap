'use client'
import React, { useState } from "react";
import SearchBox from "@/components/MapTools/SearchBox/SearchBox"
import DirectionBox from "@/components/MapTools/DirectionBox/DirectionBox"
import MapView from "@/components/Map/map"
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showDirectionBox, setShowDirectionBox] = useState(false);

  const handleSearchDirection = () => {
    setShowDirectionBox(true);
  };

  const handleSearchCancel = () => {
    setShowDirectionBox(false);
  };

  return (
    <div className="relative">
      {/* <div className="absolute" style={{ zIndex: 10000 }}>
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
      <div className="relative">
        <MapView />
      </div> */}
      <SearchBox onSearchDirection={handleSearchDirection}/>
    </div>
  )
}