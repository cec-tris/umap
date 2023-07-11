import { useState, useMemo, useContext } from 'react'
import { Popup, useMapEvent } from "react-leaflet"
import { LatLngExpression } from 'leaflet'
import FilterMenu from "@/components/MapTools/MapInteraction/FilterMenu/FilterMenu";
import MainMenu from "@/components/Map/MainMenu"



const PopupMenu = () => {
    const [menuId, setMenuId] = useState<number>(1)

    const [position, setPosition] = useState<LatLngExpression | null>(null)
    
    const map = useMapEvent('contextmenu', (e) => {
        const {lat, lng} = e.latlng
        setPosition([lat, lng])
    })

    function goToMenu(id: number) {
        setMenuId(id)
    }

    if(position === null) return null

    return (
        <Popup 
            className="h-fit rounded-lg py-0 px-0 border border-slate-200" 
            position={position}
        >
            {menuId === 1 
            ?  <MainMenu position={position} goToMenu={goToMenu} />
            :  <FilterMenu goToMenu={goToMenu}/>
            }
        </Popup>
    )
}

export default PopupMenu