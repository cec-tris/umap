import {motion} from 'framer-motion';
import AddressItem from './AddressItem';

interface FilterListAddressesProps{
    addressList: {type:string,list:Array<any>},
    showFilterList:boolean,
    setShowFilterList: any,
}

export default function FilterListAddresses(props:FilterListAddressesProps){

    props.addressList.type = "cafe";
    props.addressList.list = ["Cà phê Yes, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng"];

    return (
        props.addressList?.list?.length > 0 &&
            <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1}}
                transition={{ type: "spring", stiffness: 100 }}
                className={"w-fit h-fit bg-white absolute rounded-md shadow-xl drop-shadow-xl overflow-hidden"}
                key="filter_address_list"
                style={{ zIndex: 10001, top: 200, right:0}}
            >
                <div className="w-80 h-40 bg-white p-1">
                    <div className="">
                        Có {props.addressList?.list?.length} {props.addressList?.type} gần đây:
                    </div>
                    <div>
                    {
                        props.addressList?.list?.map((address:string, index: number) =>
                            <AddressItem address={address} key={index}/>
                        )
                    }
                    </div>
                </div>
            </motion.div>
        
    )
}