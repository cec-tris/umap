import { memo } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { SearchResult } from "@/types/Types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAddress, setSelect } from "@/redux/slices/searchSlice";
import { setDestination, setSource, setState } from "@/redux/slices/routingSlice";

function AddressList() {
    const listPlace = useAppSelector(state => state.search.addressList)
    const state = useAppSelector(state => state.routing.state)
    
    const dispatch = useAppDispatch()

    const handleLocation = (item: SearchResult) => {
        dispatch(setAddress(item))
        dispatch(setSelect('infoBox'))

        const location = {
            address: item.address,
            center: item.center
        }

        if(state === 'source') {
            dispatch(setSource(location))
            dispatch(setState(''))
        }
        else {
            dispatch(setDestination(location))
            dispatch(setState(''))
        }
    }

    return ( <>
        {
            listPlace && listPlace.length > 0 &&
            <List className='list-address bg-white w-full' component="nav" aria-label="main mailbox folders">
                {listPlace.map((item) => {
                return (
                    <div key={item?.osm_id}>
                    <ListItem
                        onClick={()=>handleLocation(item)}
                        className="hover:bg-gray-100 cursor-pointer w-full h-full"
                    >
                        <ListItemIcon>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </ListItemIcon>
                        <ListItemText primary={item?.address} />
                    </ListItem>
                    {
                        listPlace.indexOf(item) !== listPlace.length - 1 && <Divider />
                    }
                    </div>
                );
                })}
            </List>
        }
        {
            listPlace && listPlace.length === 0 && 
            <div className="bg-white w-full h-full flex justify-center items-center p-2">
                <div>Không tìm thấy kết quả</div> 
            </div>
        }
        </> );
}

export default memo(AddressList);