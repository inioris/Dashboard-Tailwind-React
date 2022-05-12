import { useEffect } from 'react';
import { useCheckIn } from './../../hooks/CheckIn';
import { useStoreCheckIn } from './../../hooks/CheckIn/StoreProvider';
import { useSale } from './../../hooks/Sale';
import { useStoreSale } from './../../hooks/Sale/StoreProvider';


export default function Inventoy() {

    const { getAllCheckIn } : any = useCheckIn();
    const {getAllSale}: any = useSale();

    const { checkIn } : any = useStoreCheckIn();
    const { sale } : any = useStoreSale();

    useEffect(() => {
        getAllCheckIn();
        getAllSale();
    }, []);

    console.log(checkIn, sale)
    return (
        <>
            <div className={'grid gap-4'}>

                <div className={'gap-4 bg-white rounded'}>
                    <div className="sm:flex sm:items-center p-4">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl text-gray-900"> Inventario </h1>
                            <p className="mt-2 text-sm text-gray-700">Visualiza la cantidad de ventas que tuviste</p>
                        </div>                 
                    </div>
                </div>           

                <hr />

                

            </div>
        </>
    )
}