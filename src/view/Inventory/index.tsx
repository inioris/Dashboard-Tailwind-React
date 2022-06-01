import React, { useEffect, useState } from 'react';
import { useCheckIn } from '../../hooks/CheckIn';
// import { useStoreCheckIn } from '../../hooks/CheckIn/StoreProvider';
import { useSale } from '../../hooks/Sale';
import moment from 'moment';
import { useStoreSale } from '../../hooks/Sale/StoreProvider';
import TableComponent from '../../components/TablaComponent';
import { isEmpty } from 'lodash';
import BasicDocument from "../../componentsPdf";


export default function Inventoy() {

    const { getAllCheckIn } : any = useCheckIn();
    const {getAllSale}: any = useSale();

    //const { checkIn } : any = useStoreCheckIn();
    const { sale } : any = useStoreSale();
    const [date, setDate] = useState(`${moment().format("YYYY-MM-DD")}`);
    const [dateEnd, setDateEnd] = useState(`${moment().format("YYYY-MM-DD")}`);
    const [listProducts, setListProducts] = useState(0);
    const [moneyBuyAll, setMoneyBuyAll] = useState(0);
    const [listCapitalBurchase, setCapitalBurchase] = useState(0);
    const [listServices, setListServices] = useState(0);
    const [listProductsAndServices, setListProductsAndServices] = useState([]);

    const products = [
        {
          id: 1,
          name: 'Cuadre de Caja',
          href: '#',
          price: `$ ${Number(listServices) + Number(moneyBuyAll) }.00`,
          color: `Detalles de tus Ventas ${date}`,
          size: `${listProductsAndServices.length} L`,
          imageSrc: 'https://escuela-emprendedores.alegra.com/wp-content/uploads/2018/08/inventario.jpg',
          imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
        },
        // More products...
      ]

    useEffect(() => {
        getAllCheckIn();
        getAllSale();
    }, []);


    useEffect(() => {
        if(!isEmpty(sale)){
            const data: any = [];

            let moneyProduct: number = 0;
            let moneyService: number = 0;
            let moneyPucharse: number = 0;
            let moneyAll: number = 0

            sale.map((item: any) => {
                if(moment(date).format("YYYY-MM-DD") <= moment(item.createdAt).format("YYYY-MM-DD") &&  moment(dateEnd).format("YYYY-MM-DD") >= moment(item.createdAt).format("YYYY-MM-DD")){
                    if(item.product.productType.id === 1){
                        moneyAll = moneyAll + Number(item.product.price);
                        moneyProduct = moneyProduct + (Number(item.product.price) - Number(item.product.priceBurchase)) * Number(item.quantity);
                        moneyPucharse = moneyPucharse + Number(item.product.priceBurchase);
                    } else {
                        moneyService = moneyService + Number(item.product.price);
                    }

                    data.push(item);
                }
            })
            setListProducts(moneyProduct);
            setListServices(moneyService);
            setCapitalBurchase(moneyPucharse);
            setMoneyBuyAll(moneyAll);
            setListProductsAndServices(data);
        }
    }, [date])


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


                {/* inicio */}


            <div className="bg-white grid grid-cols-1">
            {/* Background color split screen for large screens */}

            <header className="relative max-w-7xl mx-auto bg-indigo-900 py-6 lg:bg-transparent lg:grid lg:grid-cols-2 lg:gap-x-16 lg:px-8 lg:pt-16 lg:pb-10">
                <div className="max-w-2xl mx-auto flex px-4 lg:max-w-lg lg:w-full lg:px-0">
                    <span className={'pb-6'}>Inventario</span>
                </div>
            </header>

            <main className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2">
                <h1 className="sr-only">Checkout</h1>

                <section
                aria-labelledby="summary-heading"
                className="bg-blue-100 text-indigo-300 pt-6 pb-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-2"
                >
                <div className="max-w-2xl p-4 mx-auto lg:max-w-none ">
                    <h2 id="summary-heading" className="sr-only">
                        Order summary
                    </h2>

                    <dl>
                    <dt className="text-sm font-medium">Cantidad de Ganancias</dt>
                    <dd className="mt-1 text-3xl p-4 rounded font-extrabold bg-blue-700 text-white">${(Number(moneyBuyAll) - Number(listCapitalBurchase)) + Number(listServices)}.00</dd>
                    </dl>

                    <ul role="list" className="text-sm font-medium divide-y divide-white divide-opacity-10">
                    {products.map((product) => (
                        <li key={product.id} className="flex items-start py-6 space-x-4">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="flex-none w-20 h-20 rounded-md object-center object-cover"
                        />
                        <div className="flex-auto space-y-1">
                            <h3 className="text-blue-500">{product.name}</h3>
                            <p>{product.color}</p>
                            <p>{product.size}</p>
                        </div>
                        <p className="flex-none text-base font-medium text-blue-500">{product.price}</p>
                        </li>
                    ))}
                    </ul>

                    <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                    <div className="flex items-center justify-between">
                        <dt>Ganancias por Productos</dt>
                        <dd>${moneyBuyAll}.00</dd>
                    </div>

                    <div className="flex items-center justify-between">
                        <dt>Ganancias por Servicios</dt>
                        <dd>${listServices}.00</dd>
                    </div>

                    <div className="flex items-center justify-between">
                        <dt>Capital Inventido en Productos para Ventas</dt>
                        <dd>${listCapitalBurchase}.00</dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                        <dt className="text-base text-blue-500">Total</dt>
                        <dd className="text-base text-blue-500">${(Number(moneyBuyAll) - Number(listCapitalBurchase)) + Number(listServices)}.00</dd>
                    </div>
                    </dl>
                </div>
                </section>

                <section
                aria-labelledby="payment-and-shipping-heading"
                className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
                >
                <h2 id="payment-and-shipping-heading" className="sr-only">
                    Payment and shipping details
                </h2>

                <div>
                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                    <div>
                        <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                        Selecciona la Fecha
                        </h3>

                        <div className="mt-6 grid grid-cols-2 gap-x-4">
                            <div>
                                <label htmlFor="dateConsultin" className="block text-sm font-medium text-gray-700">
                                    Fecha Inicio
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="date"
                                        max={`${moment().format("YYYY-MM-DD")}`}
                                        id="dateConsultin"
                                        value={date}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault();
                                            const {value} = e.target;
                                            setDate(value);
                                        }}
                                        name="dateConsultin"
                                        className="block w-full border border-gray-300 py-3 px-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="dateConsultin" className="block text-sm font-medium text-gray-700">
                                    Fecha Fin
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="date"
                                        max={`${moment().format("YYYY-MM-DD")}`}
                                        id="dateConsultinEnd"
                                        value={dateEnd}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.preventDefault();
                                            const {value} = e.target;
                                            setDateEnd(value);
                                        }}
                                        name="dateConsultin"
                                        className="block w-full border border-gray-300 py-3 px-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 id="payment-heading" className="text-lg font-medium text-gray-900">
                            Total de Productos y Servicios Vendidos
                        </h3>

                        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="card-number" className="block text-lg font-medium text-gray-700">
                                    { listProductsAndServices.length }
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <TableComponent
                            isMessage={true}
                            classAditional={'w-full'}
                            title={'Productos y Servicios'}
                            descripcion={'Visualiza lo vendido en el lapso de fecha elegido'}
                            children={
                                <>
                                    <thead className="bg-gray-100">
                                <tr>
                                        <th scope="col" className={"py-2 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"}>
                                            Codigo
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Nombre
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Cantidad
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Ganancias
                                        </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                { !isEmpty(listProductsAndServices) ? listProductsAndServices.map((transaction: any) => (
                                    <tr key={transaction.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                            {transaction.product.code}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.product.name}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.quantity}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${
                                           transaction.product.productType.id === 1 ? (Number(transaction.product.price) - Number(transaction.product.priceBurchase)) * Number(transaction.quantity) : Number(transaction.product.price)
                                        }</td>
                                    </tr>
                                )) : null}
                            </tbody>

                            </>}
                        />
                    </div>

                    <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                        <button
                        type="submit"
                        onClick={() => BasicDocument({
                            name: 'CHUKY BARBER FLOW'
                        })}
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                        Imprimir
                        </button>
                    </div>
                    </div>
                </div>
                </section>
            </main>
            </div>


                {/* fin */}

            </div>
        </>
    )
}
