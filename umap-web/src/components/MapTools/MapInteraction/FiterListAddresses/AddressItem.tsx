type AddressItem = {address:string};

export default function AddressItem(props:AddressItem){
    return (
        <div className="border-2">
            <div>
                {props.address}
            </div>
        </div>
    )
}