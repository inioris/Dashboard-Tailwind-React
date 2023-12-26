import { useState, useEffect, ChangeEvent} from "react";
import { useStoreProducts } from '../../hooks/Products/StoreProvider';
import { useProducts } from "../../hooks/Products";
import { get, isEmpty } from 'lodash';
import moment from "moment";
import Input from "../../components/InputComponents";
import {useStoreAuthLogin} from "../../hooks/AuthLogin/StoreProvider";
import CancelIcons from "./../../icons/DeleteIcons";
import ModalComponents from '../../components/ModalComponent';
import { useCheckIn } from "../../hooks/CheckIn";
import Notification from "../../components/Notification";
import ReceiptPayment from '../../components/ReceiptPayment';
import { Combobox } from '@headlessui/react'

interface InewSaleListPrime {
    name: string;
    price: number;
    quantity: number;
    productType: number;
    code: string;
    unit: number;
    unitPriceTotal: number;
}

function PointSale() {

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
    const [inputServiceAndProducts, setInputServiceAndProducts] = useState('');
    const [receipt, setReceipt] = useState(false);
    const [discounts, setDiscounts] = useState(0);
    const [rnc, setRNC] = useState('');
    const [taxes, setTaxes] = useState(0);
    const [showNotifications, setShowNotification] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(products[0])
    const [query, setQuery] = useState('')

    useEffect(() => {
        listViewProducts.map((item: InewSaleListPrime) => {
            setPayment(payment + item.unitPriceTotal);
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

    const filteredProducts = query === '' ? products : products.filter((product: any) => {
        return product.name.toLowerCase().includes(query.toLowerCase())
    });

    const onClickProductsList = (id: number | string, account?: number | string) => {
        if(id){
            products.find((item: any) => {
                if(Number(item.id) === Number(id)) {
                    setListViewProducts([...listViewProducts, {
                        id: item.id,
                        name: item.name,
                        productType: Number(item.productType.id),
                        price: item.price,
                        code: item.code,
                        unit: 1,
                        unitPriceTotal: Number(item.price),
                    }]);
                    setQuery('');
                }
            });
        }
    }

    const moreUnity = (key?: any) => {
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

        const listProductsSale: any[] = [];

        listViewProducts.map((item: any) => {
            return listProductsSale.push({
                "product": item.id,
                "productType": item.productType,
                "quantity": item.unit,
            });
        })

        const purchase = {
            "user": get(authLogin, 'idUser ', 1),
            "purchaseDescription": "Todo Bueno",
            "quantity": listProductsSale.length,
            "payWith": Number(paymentMoney),
            "moneyBack": Number(paymentMoney) - Number(payment),
            "totalToPay": payment,
            "applyReturned": 1,
            "rnc": rnc,
            "listOfProductSale": listProductsSale
        };

        await saveCheckIn(purchase);
        setReceipt(!receipt);
        setListViewProducts([]);
        setShowNotification(!showNotifications);
        setPayment(0);
        setRNC('');
        setTaxes(0);
        setPaymentMoney(0);
    }

    return (
        <>
            <div className={'grid grid-cols-12 gap-4'}>
                {
                    showNotifications ?
                        <div className="col-span-12" style={{ zIndex: '9999' }}>
                            <Notification
                                message={'Guardo con Exito!'}
                                subMessage={'Gracias por su Compra.'}
                                show={showNotifications}
                                changesShow={() => setShowNotification(!showNotifications)} />
                        </div> : null
                }

                <div className={'bg-white p-1 rounded sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-8 2xl:col-span-8'}>
                        <div className={'grid grid-cols-1 pl-4 pt-4'}>
                            <span className={'text-2xl pl-2'} style={{ borderLeft: '5px solid #0415FA' }}> Lista de Compras </span>
                        </div>
                        <div className={'grid grid-cols-2 gap-4 py-4'}>
                            <div className={'pl-2 col-span-1'}>
                                <Input
                                    type="text"
                                    max={4}
                                    placeholder={'Agregar Productos'}
                                    value={inputSearch}
                                    disable={isEmpty(products)}
                                    name={"searchProductsList"}
                                    onChange={onAddProductsList}
                                    wrapperClass={"mt-1 focus:ring-indigo-500 p-2 pl-3 2xl:text-xl focus:border-indigo-500 block w-full border shadow-sm sm:text-sm border-gray-300 rounded-md"}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <div className={'pb-2 pt-2 w-full'}>
                                        <Combobox value={selectedProduct} onChange={setSelectedProduct}>
                                            <Combobox.Input
                                                onChange={(event) => setQuery(event.target.value)}
                                                className={'mt-1 mb-2 bg-gray-50 w-full focus:ring-indigo-500 p-2 pl-3 2xl:text-xl focus:border-indigo-500 block border shadow-sm sm:text-sm border-gray-300 rounded-md'}
                                            />

                                                    <Combobox.Options
                                                    className={'bg-white absolute p-2 border shadow rounded'}
                                                >

                                                    {filteredProducts.slice(0, 5).map((product : any) => (

                                                        <Combobox.Option
                                                            key={product.id}
                                                            onClick={() => onClickProductsList(product.id)}
                                                            value={product.id}
                                                            style={{ cursor: 'pointer' }}
                                                            className={'p-2 sticky rounded-md hover:bg-gray-100'}
                                                        >
                                                        <span> {product.name} </span>
                                                    </Combobox.Option>

                                                    ))}

                                                </Combobox.Options>
                                        </Combobox>
                                </div>

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
                                            Tipo
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Nombre
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
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.productType === 1 ? 'Producto' : 'Servicio'}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <button disabled={product.productType === 1 ? false : true} className='rounded-full' type={'button'} onClick={() => moreUnity(key)}>+</button>
                                                        <label>&nbsp; { product.unit } &nbsp;</label>
                                                    <button className='rounded-full' type={'button'} onClick={() => lessUnity(key)} disabled={product.unit === 1}>-</button>
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
                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                                type="button"
                                disabled={Number(payment) < Number(paymentMoney) && (Number(paymentMoney) - Number(payment)) <= 0}
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
                    <ReceiptPayment
                        list={listViewProducts}
                        subTotal={payment}
                        discounts={discounts}
                        taxes={taxes}
                        onClickSave={() => onPucharsePayment}
                    />
                </ModalComponents>
            </div>
        </>
    )
}

export default PointSale;
