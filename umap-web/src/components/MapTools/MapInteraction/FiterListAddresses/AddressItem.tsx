import { setDestination, setDirectionInfor, setSource } from "@/redux/slices/routingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type AddressItem = {lat:string, lng: string, address:string,mainMarker:any};

export default function AddressItem(props:AddressItem){
    const dispatch = useAppDispatch();
    const handle=()=>{
        dispatch(setDestination({
            address:props.address,
            center: [props.lat, props.lng]
        }));
        dispatch(setSource({
            address:props.mainMarker,
            center:[props.mainMarker[0], props.mainMarker[1]]
        }))
    };
    return (
        <div className="shadow-md my-1 px-1 ">
            <div>
                {props.address}
            </div>
            <div className="italic text-lime-500 text-sm hover:cursor-pointer" onClick={handle}>
                Chỉ đường &#62;&#62;&#62;
            </div>
        </div>
    )
}