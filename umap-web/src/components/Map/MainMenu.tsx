import { useState, useMemo } from 'react'
import { useRoutingContext } from '@/context/RoutingContext'
import { LatLngExpression } from 'leaflet'


type MainMenuProps = {
    position: LatLngExpression
    goToMenu: (id: number) => void
}

const MainMenu = ({ position, goToMenu } : MainMenuProps) => {
    const { updateSource, updateDestination } = useRoutingContext()


    return (
    <ul className="w-fit flex flex-col items-center rounded-md overflow-hidden">
        <li className="w-full p-2 text-sm font-semibold hover:bg-neutral-200 flex items-center cursor-pointer"
            onClick = {() => {
                updateSource({
                    address: "Địa chỉ bắt đầu",
                    latlng: position    
                })
            }}
        >
            Tìm đường từ đây
        </li>
        <li className="w-full p-2 text-sm font-semibold hover:bg-neutral-200 flex items-center cursor-pointer"
                onClick = {() => {
                updateDestination({
                    address: "Địa chỉ đến",
                    latlng: position    
                })
            }}
        >
            Tìm đường đến đây
        </li>
        <li className="w-full p-2 text-sm font-semibold hover:bg-neutral-200 flex items-center cursor-pointer"
            onClick={() => {goToMenu(2)}}
        >
            Tìm trong bán kính
        </li>
    </ul>
)
}

export default MainMenu