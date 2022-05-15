import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { get, isEmpty } from 'lodash';
import TableComponent from '../../components/TablaComponent';
import { useCheckIn } from './../../hooks/CheckIn';
import { useStoreCheckIn } from './../../hooks/CheckIn/StoreProvider';


export default function Home() {

    const { getAllCheckIn } : any = useCheckIn();
    const { checkIn } : any = useStoreCheckIn();
    const [cuadre, setCuadre] = useState(0);
    const [saleLength, setSaleLength] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);

    useEffect(() => {
        getAllCheckIn();
    }, []);

    useEffect(() => {
        let data: number = 0;
        let dataLength: number= 0;
        let productQuantiy: number = 0;
        const date = moment().subtract(1, 'days').format("YYYY-MM-DD");
        
        checkIn.map((item: any) => {
            if(moment(item.createdAt).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")){
                console.log(item, 'aq');
                data = data + Number(item.totalToPay);
                dataLength = dataLength + 1;
                productQuantiy = productQuantiy + Number(item.quantity);
            }
        });
        setCuadre(data);
        setSaleLength(dataLength);
        setProductQuantity(productQuantity);
    }, [checkIn]);

    const projects = [
        { name: 'Cuadre de Caja', initials: 'CC', href: '#', members: `${cuadre}`, bgColor: 'bg-pink-600' },
        { name: 'Ventas en el Dia', initials: 'VD', href: '#', members: `${saleLength}`, bgColor: 'bg-purple-600' },
        { name: 'Inventario', initials: 'I', href: '#', members: 16, bgColor: 'bg-yellow-500' },
        { name: 'Productos y Servicios Vendidos', initials: 'PS', href: '#', members: `${productQuantity}`, bgColor: 'bg-green-500' },
      ];

    return (
        <>
            <div>
                {/* information data headers */ }
                    <div className={'pb-6'}>
                        <ul className="mt-3 grid grid-cols-1 gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {projects.map((project: any, index) => (
                            <li key={project.name} className="col-span-1 flex shadow-sm rounded-md">
                                <div className={`flex-shrink-0 flex items-center ${projects[index].bgColor} justify-center w-16 text-white text-sm font-medium rounded-l-md`}>
                                {project.initials}
                                </div>
                                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-6 py-4 text-sm truncate">
                                    <Link to={`/${project.href}`} className="text-gray-900 font-medium hover:text-gray-600">
                                        {project.name}
                                    </Link>
                                    <p className="text-gray-500"> $ {project.members}</p>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button
                                    type="button"
                                    className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                    <span className="sr-only">Open options</span>
                                    
                                    </button>
                                </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                    {/* End information data headers */ }
                    <hr className={'sm:pb-2 md:pb-2 xl:pb-3 2xl:pb-3'} />
                    {/* show data components */ }
                    
                    <div className={'grid'}>
                    
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
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                 Realizada
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                 Realizada por
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
                                                Devuelta
                                            </th>
                                            <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            { !isEmpty(checkIn) ? [...checkIn].reverse().slice(0, 10).map((transaction: any) => (
                                            <tr key={transaction.id}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                {transaction.id}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{moment(transaction.createdAt).format("YYYY-MM-DD")}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{get(transaction, 'user.name', '')}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${transaction.totalToPay}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${transaction.moneyBack}</td>
                                                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link to={`/${transaction.id}`} className={'text-indigo-600 hover:text-indigo-900'}>
                                                    Ver       
                                                </Link>
                                                </td>
                                            </tr>
                                            )) : null}
                                        </tbody>
                                    </>
                                }
                                title={'Ultimas Ventas'}
                                descripcion={'Visualizar las ultimas ventas realizadas'}
                            />
                        
                    </div>
                    {/* end show data components */ }
            </div>
        </>
    );

}