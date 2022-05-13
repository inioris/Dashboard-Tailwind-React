import React, { useEffect, useState, ChangeEvent } from "react";
import {useStoreAuthLogin} from "../../hooks/AuthLogin/StoreProvider";
import { useStoreProducts } from '../../hooks/Products/StoreProvider';
import { useProducts } from "../../hooks/Products";
import { isEmpty } from "lodash";
import ModalComponents from "../../components/ModalComponent";
import TableComponent from '../../components/TablaComponent';
import Select from "../../components/SelectComponent";
// import { useStoreCategory } from "../../hooks/Category/StoreProvider";
// import { useCategory } from "../../hooks/Category";



export default function ProductsAndServices() {

    const { authLogin } : any = useStoreAuthLogin();
    const { products }: any = useStoreProducts();
    // const { category }: any = useStoreCategory();
    const { getAllProducts, saveProducts, updatedProducts } : any = useProducts();
    //const { getAllCategory } : any = useCategory();
    const [disable, setDisable] = useState(true);
    console.log(authLogin, 'aqui');
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [idd, setId] = useState(0);
    const [ formProducts, setFormProducts ] = useState({
        name: '',
        description: '',
        statusProduct: 1,
        quantity: 0,
        price: 0,
        priceBucharse: 0,
        productType: 1,
        user: 1,
        enabled: true,  
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        getAllProducts();
        // getAllCategory();
    }, []);

    console.log(authLogin);

    const changesHandleProducts = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormProducts(formProducts => ({...formProducts, [name]: value }));
    }

    const onDeleteProducts = async (id: any) => {
        const data = {
            enabled: false,
        };
        await updatedProducts(id, data);
    }

    const onSaveProducts = async () => {
        if(formProducts.productType == 1){
            const createProduct : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                statusProduct: formProducts.statusProduct,
                quantity: Number(formProducts.quantity),
                price: Number(formProducts.price),
                priceBurchase: Number(formProducts.priceBucharse),
                productType: Number(formProducts.productType),
                enabled: formProducts.enabled,
                description: formProducts.description,
            };
            await saveProducts(createProduct);
        }else {
            const createService : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                statusProduct: formProducts.statusProduct,
                price: Number(formProducts.price),
                productType: Number(formProducts.productType),
                enabled: formProducts.enabled,
                description: formProducts.description,
            };
            await saveProducts(createService);
        }
        setFormProducts({
            name: '',
            description: '',
            quantity: 0,
            statusProduct: 1,
            price: 0,
            priceBucharse: 0,
            productType: 1,
            user: 1,
            enabled: true, 
        });
        setOpen(false);
    }

    const onUpdatedProducts = async (id: any) => {

        if(formProducts.productType == 1){
            const createUpdated : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                quantity: Number(formProducts.quantity),
                price: Number(formProducts.price),
                priceBurchase: Number(formProducts.priceBucharse),
                productType: Number(formProducts.productType),
                enabled: formProducts.enabled,
                description: formProducts.description,
            };
            await updatedProducts(id, createUpdated);
        }else {
            const createUpdated : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                price: Number(formProducts.price),
                productType: Number(formProducts.productType),
                enabled: formProducts.enabled,
                description: formProducts.description,
            };
            await updatedProducts(id, createUpdated);
        }

        setFormProducts({
            name: '',
            description: '',
            statusProduct: 1,
            quantity: 0,
            price: 0,
            priceBucharse: 0,
            productType: 1,
            user: 1,
            enabled: true,  
        });
        setOpen(false);
    }

    useEffect(() => {
        console.log(formProducts.productType, 'aqui');
        formProducts.productType == 2 ? setDisable(true) : setDisable(false);
    }, [formProducts.productType]);


    return (
        <>
            <div className={'grid gap-2'}>
                <div className={'grid pb-4 pt-6'}>
                    <div className={'flex justify-end'}>
                        <button
                            type="button"
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            onClick={() => setOpen(!open)}
                        >
                            Agregar Productos o Servicios
                        </button>
                    </div>
                </div>
                <hr className={'pb-8'} />
                <div>
                        <TableComponent
                            isMessage={true}
                            title={'Productos y Servicios'}
                            inputSearch={true}
                            descripcion={'Crea, Modifica o Desabilita los productos o servicios a elegir'}
                            children={
                                <>
                                    <thead className="bg-gray-100">
                                <tr>
                                        <th scope="col" className={"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"}>
                                            Codigo
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Nombre
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Estado
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Cantidad
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Tipo
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Precio de Compra
                                        </th>
                                        <th scope="col" className={"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}>
                                            Precio de Venta
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8" />
                                </tr>
                            </thead>
                            <tbody className={"divide-y divide-gray-200 bg-white h-48"}>
                                        {products.slice(0,6).map((product: any) => (
                                            <tr>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                    {product.code}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className={'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800'}>
                                                        {product.enabled ? 'Activo' : 'Habilitado'} 
                                                    </span> 
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                     <span className={'flex justify-center'}>
                                                        {product.quantity ? product.quantity : '-'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                   <span className={'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800'}>
                                                        {product.productType?.name}
                                                   </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className={'flex justify-center'}>
                                                        {product.priceBurchase}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {product.price}
                                                </td>
                                                <td className="relative whitespace-nowrap text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                   
                                                        <div className={'grid grid-cols-2'}>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>{
                                                                        setId(product.id);
                                                                        setUpdated(!updated);
                                                                        setOpen(!open);
                                                                        setFormProducts({
                                                                            name: product.name,
                                                                            description: product.description,
                                                                            quantity: product.quantity,
                                                                            statusProduct: 1,
                                                                            price: product.prince,
                                                                            priceBucharse: product.priceBucharse,
                                                                            productType: product.productType?.id,
                                                                            user: product.user.id,
                                                                            enabled: product.enabled,  
                                                                        });
                                                                    }}
                                                                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                                                >
                                                                    M
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setId(product.id);
                                                                        setOpen(!open);
                                                                        setDeleted(!deleted)
                                                                    }}
                                                                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                                                >
                                                                    E
                                                                </button>
                                                            </div>
                                                        </div>                                              
                                                   
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                                </>
                            }
                        />
                </div>
                <ModalComponents 
                    openForm={open}
                    closeFormModal={() => setOpen(!open)}
                    title={'Agregar Productos o Servicios'}
                    size={'800px'}
                    children={
                        <>
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                    
                                    <div className="shadow overflow-hidden">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Nombre de Producto o Servicio
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={changesHandleProducts}
                                                    placeholder={'Nombre Producto o Servicio'}
                                                    value={formProducts.name}
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <Select
                                                    data={[
                                                        {
                                                            id: 1,
                                                            name: 'Productos'
                                                        },
                                                        {
                                                            id: 2,
                                                            name: 'Servicios'
                                                        }
                                                    ]}
                                                    name={'productType'}
                                                    value={formProducts.productType}
                                                    onChange={changesHandleProducts}
                                                    isLabel={'top'}
                                                    label={'Tipo'}
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <div className={'grid grid-cols-6 gap-4'}>
                                                    <div className={'col-span-2'}>
                                                    <label htmlFor="price-bucharse" className="block text-sm font-medium text-gray-700">
                                                            Precio Compra
                                                        </label>
                                                        <input
                                                            type="number"
                                                            disabled={disable}
                                                            value={formProducts.priceBucharse}
                                                            onChange={changesHandleProducts}
                                                            name="priceBucharse"
                                                            placeholder={'Precio Compra'}
                                                            id="price-bucharse"
                                                            className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                        />
                                                </div>
                                                <div className={'col-span-2'}>
                                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                            Precio Venta
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={formProducts.price}
                                                            onChange={changesHandleProducts}
                                                            name="price"
                                                            placeholder={'Precio Venta'}
                                                            id="price"
                                                            className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                        />
                                                </div>
                                                <div className={'col-span-2'}>
                                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                            Cantidad
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={formProducts.quantity}
                                                            disabled={disable}
                                                            onChange={changesHandleProducts}
                                                            name="quantity"
                                                            placeholder={'Cantidad'}
                                                            id="quantity"
                                                            className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                        />
                                                </div>
                                                </div>
                                            </div>
                                            <div className={'col-span-6'}>
                                                
                                                <div className={'grid grid-cols-6 gap-4'}>


                                                {/* <div className={'col-span-2'}>
                                                        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                                                                Fecha de Caducidad
                                                            </label>
                                                            <input
                                                                type="date"
                                                                value={formProducts.expirationDate}
                                                                disabled={disable}
                                                                onChange={changesHandleProducts}
                                                                name="expirationDate"
                                                                id="expirationDate"
                                                                className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                            />
                                                    </div> */}
                                                    

                                                    {/* {
                                                        !isEmpty(category) && disable ?
                                                            <>
                                                                <div className={'col-span-2'}>
                                                                    <Select
                                                                        data={category}
                                                                        onChange={changesHandleProducts}
                                                                        name={'category'}
                                                                        isLabel={'top'}
                                                                        label={'Categoria'}
                                                                    />
                                                                </div> 
                                                            </> : null
                                                    } */}
                                                    
                                                    {/* <div className={'col-span-2'}>
                                                    
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className={'col-span-6'}>
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                        Decripcion
                                                    </label>
                                                    <textarea 
                                                        name={'description'}
                                                        value={formProducts.description}
                                                        onChange={changesHandleProducts}
                                                        rows={3}
                                                        id={'description'}
                                                        className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"

                                                    />
                                               </div>
                                          </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                          {
                                              updated ?
                                                <button
                                                type={"button"}
                                                onClick={() => onUpdatedProducts(idd)}
                                                className={"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                                            > Actualizar </button> : null
                                          }  
                                          {
                                              deleted ?
                                                <button
                                                type={"button"}
                                                onClick={() => onDeleteProducts(idd)}
                                                className={"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                                            > Emilinar </button> : null
                                          } 
                                          {
                                              updated && deleted ?
                                                null :
                                                <button
                                                type={"button"}
                                                onClick={onSaveProducts}
                                                className={"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                                            > Guardar </button>
                                          }
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