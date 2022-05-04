import { useState, useEffect } from "react";
import { get } from 'lodash';
import Input from "../../components/InputComponents";
import {useStoreAuthLogin} from "../../hooks/AuthLogin/StoreProvider";
import CancelIcons from "./../../icons/DeleteIcons";
import { useProducts } from './../../hooks/Products';
import { useStoreProducts } from './../../hooks/Products/StoreProvider';
import ModalComponents from '../../components/ModalComponent';
import { useCheckIn } from "../../hooks/CheckIn";
import Notification from "../../components/Notification";
import RemoveIcons from '../../icons/RemoveIcons';

interface InewSaleListPrime {
    name: string;
    price: number;
    quantity: number;
    code: string;
    unit: number;
    unitPriceTotal: number;
}

function PointSale(){

    const { authLogin } : any = useStoreAuthLogin();
    const { getAllProducts } : any = useProducts();
    const { saveCheckIn } : any = useCheckIn();
    const { products }: any = useStoreProducts();

    useEffect(() => {
        getAllProducts();
    }, []);

    const [paymentMoney, setPaymentMoney] = useState(0);
    const [payment, setPayment] = useState(0);
    const [checkDescApli, setCheckDescApli] = useState(false);
    const [checkRNC, setCheckRNC] = useState(false);
    const [listViewProducts, setListViewProducts] : any[] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [receipt, setReceipt] = useState(false);
    const [discounts, setDiscounts] = useState(0);
    const [rnc, setRNC] = useState('');
    const [taxes, setTaxes] = useState(0);
    const [showNotifications, setShowNotification] = useState(false);

    useEffect(function updatedPaymentCashier() {
        listViewProducts.map((item: InewSaleListPrime) => {
            setPayment(payment + item.unitPriceTotal)
        });
    }, [listViewProducts]);

    const onAddProductsList = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const {value} = e.target;
        setInputSearch(value);

        if(value.length === 4){
            products.find((item: any) => {
                if(item.code === value) {
                    setListViewProducts([...listViewProducts, {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        code: item.code,
                        unit: 1,
                        unitPriceTotal: Number(item.price),
                    }]);
                    setInputSearch('');
                }
            });
        }
    }

    const moreUnity = (key?: any) => {
        console.log(key, 'mas');
        const dataListProducts: any = listViewProducts.find((item: any, index: number) => index === key);

        if(dataListProducts){
            dataListProducts.unit = Number(dataListProducts.unit) + 1;
            dataListProducts.unitPriceTotal = Number(dataListProducts.unit) * Number(dataListProducts.price);
        }

        setListViewProducts([...listViewProducts]);
    }
    
    const lessUnity = (key?: any) => {
        const product: any = listViewProducts
            .find((item: any, index: number) => index === key);
            if(product){
                product.unit = Number(product.unit) - 1;
                product.unitPriceTotal = Number(product.unit) * Number(product.price);
            }
    
            setListViewProducts([...listViewProducts]);
    }

    const onPucharsePayment = async () => {
        console.log('hola');
        const listProductsSale: any[] = listViewProducts.map((item: any) => {
            return listProductsSale.push({
                "product": item.id,
                "quantity": item.unit,
                "createdAt": new Date(),
                "updatedAt": new Date(),
            });
        })

        const purchase = {
            "user": get(authLogin, 'idUser', 1),
            "purchaseDescription": "Todo Bueno",
            "quantity": listProductsSale.length,
            "payWith": Number(paymentMoney),
            "moneyBack": Number(paymentMoney) - Number(payment),
            "totalToPay": payment,
            "applyReturned": 1,
            "rnc": rnc,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "listOfProductSale": listProductsSale
        };
        console.log(purchase);
        await saveCheckIn(purchase).then((res: any) => {
            if(res.status === 200 || res.status === 204){
                setReceipt(!receipt);
                setShowNotification(!showNotifications);
            }
        });
    }

    return (
        <>
            <div className={'grid grid-cols-12 gap-4'}>
                {
                    showNotifications ?
                        <div className="col-span-12 relative">
                            <Notification show={showNotifications} changesShow={() => setShowNotification(!showNotifications)} />
                        </div> : null
                }
                
                <div className={'bg-white p-1 rounded sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-8 2xl:col-span-8'}>
                        <div className={'grid grid-cols-1 pl-4 pt-4'}>
                            <span className={'text-2xl pl-2'} style={{ borderLeft: '5px solid #0415FA' }}> Lista de Compras </span>
                        </div>
                        <div className={'grid grid-cols-2 gap-4 py-4'}>
                            <div className={'pl-2'}>
                                <Input
                                    type="text"
                                    max={4}
                                    placeholder={'Agregar Productos'}
                                    value={inputSearch}
                                    name={"searchProductsList"}
                                    onChange={onAddProductsList}
                                    wrapperClass={"mt-1 focus:ring-indigo-500 p-2 pl-3 2xl:text-xl focus:border-indigo-500 block w-full border shadow-sm sm:text-sm border-gray-300 rounded-md"}
                                />
                            </div>
                        </div>
                        
                        <div className="overflow-scroll shadow h-96 ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className={"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"}>
                                            Codigo
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Nombre Producto
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Precio
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Cantidad
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Precio Total
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8" />
                                    </tr>
                                </thead>
                                <tbody className={"divide-y divide-gray-200 bg-white h-48"}>
                                        {listViewProducts.map((product: InewSaleListPrime, key: number) => (
                                            <tr>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                    {product.code}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <button className='rounded-full' type={'button'} onClick={() => moreUnity(key)}>+</button>
                                                        <label>&nbsp; { product.unit } &nbsp;</label>
                                                    <button className='rounded-full' type={'button'} onClick={() => lessUnity(key)} disabled={product.unit === 1 ? true : false}>-</button>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.unitPriceTotal}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                    <CancelIcons w="w-6" h="h-6" class={"text-blue-600 hover:text-red-800"} />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                        </table>
                    </div>
                    <div className={'py-4'}>
                        <button
                            type="submit"
                            className={`inline-flex justify-center py-2 px-4 2xl:py-4 2xl:px-8 border border-transparent shadow-sm text-sm 2xl:text-2xl rounded-md text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            onClick={()=>setListViewProducts([])}
                        > Limpiar Lista de Compras </button>
                    </div>
                </div>
                <div className={'bg-white p-1 rounded sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4 2xl:col-span-4'}>
                    <div className={'grid grid-cols-1 gap-2'}>
                        <div className={'bg-purple-500 rounded'}>
                            <span className={'text-xl flex justify-center p-5 text-white text-5xl'}>
                                {
                                    payment
                                }
                            </span>
                        </div>
                        <div className={'gap-2'}>
                            <Input 
                                 type="number"
                                 name="paymentMoney"
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    const {value} = e.target;
                                    setPaymentMoney(Number(value));
                                 }}
                                 wrapperClass={"mt-1 focus:ring-indigo-500 p-4 pl-3 2xl:text-xl focus:border-indigo-500 block w-full border shadow-sm text-xl border-gray-300 rounded-md"}
                                 placeholder={"Pago Con"}
                            />
                        </div>
                        <div className={'bg-purple-500 rounded'}>
                            <span className={'text-xl flex justify-center p-5 text-white text-3xl'}>
                                Devuelta: { `$ ${Number(paymentMoney) - Number(payment)}` }
                            </span>
                        </div>
                        <hr />
                        <div className={'grid grid-cols-2'}>
                            <div className={'col-span-1 pl-3'}>
                                <div className={'grip grip-cols-6 pt-10'}>
                                    <input name={'checkDescApli'} type={'checkbox'} className={'border border-gray-300'} defaultChecked={checkDescApli} onChange={() => setCheckDescApli(!checkDescApli)}  /> Aplicar Descuento
                                </div> 
                            </div>
                            <div className={'col-span-1'}>
                                {
                                    checkDescApli ?
                                        <Input 
                                        type="number"
                                        name="paymentDesc"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault();
                                            const {value} = e.target;
                                            setDiscounts(Number(value));
                                         }}
                                        wrapperClass={"mt-1 focus:ring-indigo-500 p-2 pl-3 2xl:text-xl focus:border-indigo-500 block w-full border shadow-sm text-xl border-gray-300 rounded-md"}
                                        placeholder={"Descuento"}
                                    /> : null
                                }
                            </div>
                        </div>
                        <hr />
                        <div className={'grid grid-cols-4'}>
                            <div className={'col-span-1 pl-3'}>
                                <div className={'grip grip-cols-6 pt-10'}>
                                    <input name={'checkRNC'} type={'checkbox'} className={'border border-gray-300'} defaultChecked={checkRNC} onChange={() => setCheckRNC(!checkRNC)}  /> RNC
                                </div> 
                            </div>
                            <div className={'col-span-3'}>
                                {
                                    checkRNC ?
                                        <Input 
                                        type="number"
                                        name="rnc"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault();
                                            const {value} = e.target;
                                            setRNC(value);
                                         }}
                                        wrapperClass={"mt-1 focus:ring-indigo-500 p-2 pl-3 2xl:text-xl focus:border-indigo-500 block w-full border shadow-sm text-xl border-gray-300 rounded-md"}
                                        placeholder={"RNC"}
                                    /> : null
                                }
                            </div>
                        </div>
                        <hr />
                        <div className={'grid pt-16'}>
                            <button
                                type="submit"
                                disabled={payment < paymentMoney && (Number(paymentMoney) - Number(payment)) <= 0  ? true : false}
                                onClick={() => setReceipt(!receipt)}
                                className={`inline-flex ${payment < paymentMoney ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-300'} justify-center py-4 px-4 2xl:py-4 2xl:px-8 border border-transparent shadow-sm text-sm xl:text-2xl 2xl:text-2xl rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            > Realizar Pago </button>
                        </div>
                    </div>
                </div>
                
                <ModalComponents 
                    title={'Detalles de Compra'} 
                    closeFormModal={() => setReceipt(!receipt)}
                    openForm={receipt}
                    size={'600px'}
                >
                    <div className={'bg-white grid grid-cols-1'}>
            <div className="mt-10 lg:mt-0 px-8 py-4 pb-10">
            
                <h2 className="text-xl flex justify-center font-medium text-gray-900">Resumen de Compra</h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <div className={'h-64 overflow-scroll'}>
                        <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className={"py-2.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"}>
                                            Codigo
                                        </th>
                                        <th scope="col" className={"px-3 py-2.5 text-left text-sm font-semibold text-gray-900"}>
                                            Nombre Producto
                                        </th>
                                        <th scope="col" className={"px-3 py-2.5 text-left text-sm font-semibold text-gray-900"}>
                                            Cantidad
                                        </th>
                                        <th scope="col" className={"px-3 py-2.5 text-left text-sm font-semibold text-gray-900"}>
                                            Precio Total
                                        </th>
                                        <th scope="col" className="relative py-2.5 pl-3 pr-4 sm:pr-6 lg:pr-8" />
                                    </tr>
                                </thead>
                                <tbody className={"divide-y divide-gray-200 bg-white h-48"}>
                                        {
                                           listViewProducts ? listViewProducts.map((product: any, key: number) => (
                                                <tr>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                        {product.code}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.unit}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.unitPriceTotal}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                        <RemoveIcons w="w-6" h="h-6" class={"text-red-600 hover:text-red-800"} />
                                                    </td>
                                                </tr>
                                            )) : null
                                        }
                                </tbody>
                        </table>
                </div>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            ${payment}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Descuentos</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            ${discounts}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Impuestos</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            ${taxes}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">
                            ${ Number(payment)  + Number(taxes) + Number(discounts) }
                        </dd>
                    </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                        type={"button"}
                        onClick={onPucharsePayment}
                        className={"w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"}
                    >
                    Confirmar Orden
                    </button>
                </div>
                </div>
            </div>
        </div>
                </ModalComponents>
            </div>
        </>
    )
};

export default PointSale;