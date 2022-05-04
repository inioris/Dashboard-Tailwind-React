import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import TableComponent from '../../components/TablaComponent';
import { useProducts } from './../../hooks/Products';
import { useStoreProducts } from './../../hooks/Products/StoreProvider';

const projects = [
    { name: 'Cuadre de Caja', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
    { name: 'Avastecer Productos', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Inventario', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
    { name: 'Ventas del dia', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
  ];

export default function Home() {

    const { getAllProducts } : any = useProducts();
    const { products } : any = useStoreProducts();

    console.log(products, 'aqui');

    useEffect(() => {
        getAllProducts();
    }, []);

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
                                    <p className="text-gray-500">{project.members} Members</p>
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
                    { !isEmpty(products) ? products[0].permissions : ''}
                    <div className={'grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'}>
                        <div className={'col-span-1'}>
                            <TableComponent
                                isMessage={true}
                                title={'Ultimas Ventas'}
                                descripcion={'Visualizar las ultimas ventas realizadas'}
                            />
                        </div>
                        <div className={'col-span-1'}>
                            <TableComponent
                                isMessage={true}
                                title={'Productos mas vendidos'}
                                descripcion={'Visualizar Productos con mas demanda'}
                            />
                        </div>
                    </div>
                    {/* end show data components */ }
            </div>
        </>
    );

}