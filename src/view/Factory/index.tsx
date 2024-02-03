import { useEffect, useState } from 'react';
import { useCheckIn } from './../../hooks/CheckIn';
import { useStoreCheckIn } from './../../hooks/CheckIn/StoreProvider';
import { useSale } from './../../hooks/Sale';
import moment from 'moment';
import { useStoreSale } from './../../hooks/Sale/StoreProvider';
import TableComponent from '../../components/TablaComponent';
import { get, isEmpty } from 'lodash';
import ModalComponents from "../../components/ModalComponent";

export default function FactoryView(){

    const { getAllCheckIn } : any = useCheckIn();
    const {getAllSale}: any = useSale();

    const { checkIn } : any = useStoreCheckIn();
    const { sale } : any = useStoreSale();

    const [openShow, setOpenShow] = useState(false);
    const [productsSale, setProductsSale] = useState([]);
    const [nFacture, setNFacture] = useState(0);
    const [dataAdicionaly, setDataAdicionaly] = useState({
        rnc: '',
        username: '',
        payWith: '',
        moneyBack: '',
        totalToPay: ''
    })

    useEffect(() => {
        getAllCheckIn();
        getAllSale();
    }, []);

    const onShowProductsSale = (id: number) => {
        const data: any = [];
        sale.map((item: any) => {
            if(item.checkIn.id === id){
                data.push(item);
            }
        })
        setProductsSale(data);
    }

    return (

        <>
            <div className={'grid gap-4'}>

                <div className={'gap-4 bg-white rounded'}>
                    <div className="sm:flex sm:items-center p-4">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl text-gray-900"> Facturas </h1>
                        </div>                 
                    </div>
                </div>           

                <hr />

                <div className={'p-2'}>
                <TableComponent
                                isMessage={true}
                                children={
                                    <>
                                        <thead className="bg-gray-50">
                                            <tr>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                ID Factura
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                 Fecha Factura
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                 Producto Vendido
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                 Total Compra
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                 Pago Con
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Devuelta
                                            </th>
                                            <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Ver</span>
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            { !isEmpty(checkIn) ? [...checkIn].reverse().slice(0, 7).map((transaction: any) => (
                                            <tr key={transaction.id}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                {transaction.id}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{moment(get(transaction, 'createdAt', '')).format('DD-MM-YYYY')}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{get(transaction, 'quantity', '1')}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${transaction.totalToPay}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${transaction.payWith}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${transaction.moneyBack}</td>
                                                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button onClick={() => { 
                                                        console.log(transaction);
                                                        setNFacture(transaction.id);
                                                        onShowProductsSale(transaction.id);
                                                        setDataAdicionaly({
                                                            rnc: transaction.rnc,
                                                            username: transaction.user.name,
                                                            payWith: transaction.payWith,
                                                            moneyBack: transaction.moneyBack,
                                                            totalToPay: transaction.totalToPay
                                                        });
                                                        setOpenShow(true);
                                                        }
                                                        } className="bg-blue-600 p-3 text-white rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Ver ventas
                                                    </button>
                                                </td>
                                            </tr>
                                            )) : null}
                                        </tbody>
                                    </>
                                }
                                title={'Facturas'}
                                descripcion={'Visualiza o busca tus ultimas facturas'}
                            />
                </div>
                <ModalComponents 
                    openForm={openShow}
                    closeFormModal={() => setOpenShow(!openShow)}
                    title={`Detalles de Factura N.º ${nFacture}`}
                    size={'800px'}
                    children={
                        <>
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <div className="shadow overflow-hidden">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className={'grid grid-cols-2 p-3 gap-8'}>
                                                    <div className={'grid'}>
                                                        <div className={'text-base text-gray-800'}>RNC</div>
                                                        <div><span className={'text-sm text-gray-400'}> {get(dataAdicionaly, 'rnc', '')} </span></div>
                                                    </div>
                                                    <div className={'grid'}>
                                                         <div className={'text-base text-gray-800'}>Realizada Por</div>
                                                         <div><span className={'text-sm text-gray-400'}> {get(dataAdicionaly, 'username', '')} </span></div>
                                                    </div>
                                                    <div className={'grid'}>
                                                         <div className={'text-base text-gray-800'}>Monto Total</div>
                                                         <div><span className={'text-sm text-gray-400'}> {get(dataAdicionaly, 'totalToPay', '')} </span></div>
                                                    </div>
                                                    <div className={'grid'}>
                                                         <div className={'text-base text-gray-800'}>Pago con</div>
                                                         <div><span className={'text-sm text-gray-400'}> {get(dataAdicionaly, 'payWith', '')} </span></div>
                                                    </div>
                                                    <div className={'grid'}>
                                                         <div className={'text-base text-gray-800'}>Devuelta</div>
                                                         <div><span className={'text-sm text-gray-400'}> {get(dataAdicionaly, 'moneyBack', '')} </span></div>
                                                    </div>
                                                </div>
                                                <div className={'grid p-4 border'}>
                                                    {
                                                        productsSale.map((item: any) => (
                                                            <div className={'grid grid-cols-5 border-b pb-2'}>
                                                                <div className={'col-span-2'}>
                                                                    <div className={'grid pb-3'}>
                                                                        <div className={'text-base text-gray-800'}>Nombre Producto</div>
                                                                        <div><span className={'text-sm text-gray-400'}> {item.product.name} </span></div>
                                                                    </div>
                                                                </div>
                                                                <div className={'grid pb-3'}>
                                                                    <div className={'text-base text-gray-800'}>Cantidad</div>
                                                                    <div><span className={'text-sm text-gray-400'}> {item.quantity} </span></div>
                                                                </div>
                                                                <div className={'grid pb-3'}>
                                                                    <div className={'text-base text-gray-800'}>Costo</div>
                                                                    <div><span className={'text-sm text-gray-400'}> {Number(item.product.price)} </span></div>
                                                                </div>
                                                                <div className={'grid pb-3'}>
                                                                    <div className={'text-base text-gray-800'}>Ganancia</div>
                                                                    <div><span className={'text-sm text-gray-400'}> { Number(item.quantity) * (Number(item.product.price) - Number(item.product.priceBurchase))} </span></div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                />

            </div>
        </>

    )
}