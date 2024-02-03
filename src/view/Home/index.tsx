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
    const [cuadreMonth, setCuadreMonth] = useState(0);
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
        const dateMonth = moment().subtract(30, 'days').format("YYYY-MM-DD");
        let dataMonth: number = 0;
        
        checkIn.map((item: any) => {
            if(moment(item.createdAt).format("YYYY-MM-DD") > moment(date).format("YYYY-MM-DD")){
                data = data + Number(item.totalToPay);
                dataLength += 1;
                productQuantiy += Number(item.quantity);
            }

            if(moment(item.createdAt).format("YYYY-MM-DD") > moment(dateMonth).format("YYYY-MM-DD")){
                dataMonth += Number(item.totalToPay);
            }
        });
        setCuadre(data);
        setSaleLength(dataLength);
        setCuadreMonth(dataMonth)
        setProductQuantity(productQuantiy);
    }, [checkIn]);

    const projects = [
        { name: 'Cuadre de Caja', initials: 'CC', href: '#', subName: '$', members: cuadre, bgColor: 'bg-pink-600' },
        { name: 'Ventas en el Dia', initials: 'VD', href: '#', subName: 'Cantidad', members: `${saleLength}`, bgColor: 'bg-purple-600' },
        { name: 'Ventas del mes', initials: 'I', href: '#', members: cuadreMonth, subName: '', bgColor: 'bg-yellow-500' },
        { name: 'Productos', initials: 'PS', subName: 'Cantidad', members: productQuantity, bgColor: 'bg-green-500' },
      ];

    return (
        <>
            <div>
                {/* information data headers */ }
                    <div className={'pb-6'}>
                        <dl className={"mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4"}>
                            {
                                projects.map((project: any) => (
                                    <>
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                                            <dt className="text-sm font-medium leading-6 text-gray-500">{ project.name }</dt>
                                            <dd className="text-xs font-medium text-gray-700" />
                                            <dd className="w-full flex-none text-2xl font-medium leading-10 tracking-tight text-gray-900">{project.subName} {project.members}</dd>
                                        </div>
                                    </>
                                ))
                            }
                        </dl>
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
                                                <Link to={`/facturas`} className={'text-indigo-600 hover:text-indigo-900'}>
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