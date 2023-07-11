'use client'
import { useState, memo, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faSearch, faMapMarkerAlt, faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './directionBoxStyle.component.css'
import AddressList from '../AddressList/AddressList';
import { motion } from 'framer-motion';
import { useRoutingContext } from '@/context/RoutingContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface DirectionBoxProps {
    onDirectionCancel: () => void;
  }

interface SearchResult {
    place_id: string;
    display_name: string;
  }
  
  let addresses: SearchResult[] = [
    {
      place_id: '1',
      display_name: '147 Nguyen Cong Tru'
    }, 
    
    {
      place_id: '2',
      display_name: '69 Tan Lap, Dong Hoa, Di An, Binh Duong ssssssssssssss'
    }
  ]

const DirectionBox: React.FC<DirectionBoxProps> = (props) => {
    const { source, destination, swapOrder } = useRoutingContext()
    const [listPlace, setListPlace] = useState<SearchResult[]>([]);
    const srcSearchRef = useRef<HTMLInputElement>(null)
    const destSearchRef = useRef<HTMLInputElement>(null)

    const handleSearch = () => {
        setListPlace(addresses)
    };

    const handleCancel = () => {
        props.onDirectionCancel()
    }

    useEffect(() => {
        console.log(source, destination)
        if(srcSearchRef.current != null && source?.address != null) {
            srcSearchRef.current.value = source.address
        }
        if(destSearchRef.current != null && destination?.address != null) {
            destSearchRef.current.value = destination.address
        }
    }, [source?.address, destination?.address]) 

    return (
        <motion.div 
            initial={{opacity:0, x: -500}}
            animate={{opacity:1, x: 0}}
            exit={{opacity:0, x: -500}}
            transition={{duration: 0.5}}
            key="direction-box"
            className="bg-white fixed flex flex-col h-screen shadow-xl max-w-[300px] md:max-w-[400px]">
            <div className="direction-tool flex items-center justify-between p-2 border-b-2">
                <button className="direction-button w-[40px] d-flex justify-center items-center rounded-md group hover:bg-gray-100">
                    <FontAwesomeIcon icon={faDirections} className="group-hover:text-green-400"/>
                </button>
                <button className="cancel-button w-[40px] flex justify-center items-center rounded-md group hover:bg-gray-100" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faTimes} className="group-hover:text-slate-800"/>
                </button>
            </div>
            <div className="direction-box p-2 w-full">
                <div className="direction-start">
                    <div className="icon-start w-[40px] flex justify-center items-center">
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                    
                    <input 
                        type="text"
                        ref = {srcSearchRef}
                        placeholder='Chọn điểm bắt đầu...'
                        className='search-input w-full outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent text-sm md:text-base' 
                    />
                    <button className="group search-button w-[40px] flex justify-center items-center hover:bg-green-400 hover:border-transparent" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} className="group-hover:text-white"/>
                    </button>
                </div>
                <div className='border border-red-500 rounded-full w-fit hover:bg-red-300 cursor-pointer ml-auto mr-2'
                    onClick={swapOrder}
                >
                    <SwapHorizIcon className='text-red-500'/>
                </div>
                <div className="direction-des">
                    <div className="icon-direction w-[40px] flex justify-center items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <input 
                        type="text"
                        ref = {destSearchRef}
                        placeholder='Chọn điểm đến...'
                        className='search-input w-full outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent text-sm md:text-base'
                    />    
                    <button className="group search-button w-[40px] flex justify-center items-center hover:bg-green-400 hover:border-transparent" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} className="group-hover:text-white"/>
                    </button>
                </div>
            </div>
            <div className="direction-address  max-w-[300px] md:max-w-[500px]">
                <AddressList listPlace={listPlace}/>
            </div>
        </motion.div>
    )
}

export default memo(DirectionBox)