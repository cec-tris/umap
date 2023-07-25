import {motion} from 'framer-motion';
import AddressItem from './AddressItem';

interface FilterListAddressesProps{
    addressList: {type:string,list:Array<any>},
    showFilterList:boolean,
    setShowFilterList: any,
}

export default function FilterListAddresses(props:FilterListAddressesProps){
    const closeHandler = ()=>{
        props.setShowFilterList(false);
    }
    props.addressList.type = "cafe";
    props.addressList.list = ["Cà phê Yes, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học",
    "Cà phê Yes, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học",
    "Cà phê Yes, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học",
    "Cà phê Yes, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học","Cà phê Xyz, đường Trần Mạnh Dũng, làng Đại học"];

    return (
        props.addressList?.list?.length > 0 &&
            <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1}}
                transition={{ type: "spring", stiffness: 100 }}
                className={"w-fit h-fit bg-white absolute rounded-md shadow-xl"}
                key="filter_address_list"
                style={{ zIndex: 10001, top: 200, right:0}}
            >
                <div className="w-80 h-40 bg-white p-1 overflow-scroll h-96">
                    <div className="w-full h-10 bg-white p-1">
                        {/* <CloseButton style={{float:'right',
                            backgroundSize:"cover", 
                            width:"40px", height:"40px"}}></CloseButton> */}
                        <button onClick={closeHandler} type="button" className="hover:bg-neutral-200"
                            aria-label="Close" style={{ float: 'right' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" className="bi bi-x " viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-lg p-2 font-semibold">
                        Có {props.addressList?.list?.length} {props.addressList?.type} xung quanh:
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