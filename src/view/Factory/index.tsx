import { useEffect } from 'react';
import { useCheckIn } from './../../hooks/CheckIn';
import { useStoreCheckIn } from './../../hooks/CheckIn/StoreProvider';
import { useSale } from './../../hooks/Sale';
import { useStoreSale } from './../../hooks/Sale/StoreProvider';




export default function FactoryView(){

    const { getAllCheckIn } : any = useCheckIn();
    const {getAllSale}: any = useSale();

    const { checkIn } : any = useStoreCheckIn();
    const { sale } : any = useStoreSale();

    useEffect(() => {
        getAllCheckIn();
        getAllSale();
    }, []);

    console.log(checkIn, sale);

    return (

        <>
            
        </>

    )
}