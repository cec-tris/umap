type AddressItem = {address:string};

export default function AddressItem(props:AddressItem){
    const handle=()=>{console.log("On click...")};
    return (
        <div className="border-2 border-black shadow-sm my-1 px-1 ">
            <div>
                {props.address}
            </div>
            <div className="italic text-lime-500 hover:cursor-pointer" onClick={handle}>
                Chỉ đường &#62;&#62;&#62;
            </div>
        </div>
    )
}