import React, { useEffect, useState, ChangeEvent } from "react";
import {useStoreAuthLogin} from "../../hooks/AuthLogin/StoreProvider";
import { useStoreProducts } from '../../hooks/Products/StoreProvider';
import { useProducts } from "../../hooks/Products";
import ModalComponents from "../../components/ModalComponent";
import TableComponent from '../../components/TablaComponent';
import Select from "../../components/SelectComponent";
import DeleteModalComponents from '../../components/DeleteModalComponents';
import TrashDeleteIcons from "../../icons/trashDeleteIcons";
import EditIcons from "../../icons/EditIcons";
import { InformationCircleIcon } from '@heroicons/react/20/solid'



export default function ProductsAndServices() {

    const { authLogin } : any = useStoreAuthLogin();
    const { products }: any = useStoreProducts();
    const { getAllProducts, saveProducts, updatedProducts } : any = useProducts();
    const [disable, setDisable] = useState(true);
    const [pocentage, setPocentage] = useState(true);
    const [inpuesto, setInpuesto] = useState(true);


    const [updated, setUpdated] = useState(false);
    const [valueInputX, setValueInputX] = useState('');
    const [productsSearch, setProductsSearch] = useState([]);
    const [idd, setId] = useState(0);
    const [ formProducts, setFormProducts ] = useState({
        name: '',
        description: '',
        statusProduct: 1,
        quantity: 0,
        price: 0,
        tax: 0,
        expirationAlert: 0,
        priceBurchase: 0,
        porcentagePrice: 0,
        expirationDate: '',
        productType: 1,
        user: 1,
        enabled: true,
    });

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        const query: any = 'enabled=1'
        getAllProducts(query);
        // getAllCategory();
    }, []);

    const changesHandleProducts = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormProducts(formProducts => ({...formProducts, [name]: value }));
    }

    useEffect(() => {
        if(Number(formProducts.priceBurchase) > 0) {
            const otherName = 'price';
            const otherPrice = (Number(formProducts.priceBurchase) * Number(formProducts.tax)) / 100;
            let price: any = Number(formProducts.priceBurchase) + otherPrice;
            if(formProducts.porcentagePrice > 0) {
                const porcentagePrice = (Number(price) * Number(formProducts.porcentagePrice)) / 100;
                price = price + porcentagePrice;
            }
            setFormProducts(formProducts => ({...formProducts, [otherName]: price.toFixed(2) }));
        }
    }, [formProducts.tax]);

    useEffect(() => {
        if(Number(formProducts.priceBurchase) > 0) {
            const otherName = 'price';
            const otherPrice = (Number(formProducts.priceBurchase) * Number(formProducts.porcentagePrice)) / 100;
            let price: any = Number(formProducts.priceBurchase) + otherPrice;
            if(formProducts.tax > 0) {
                const tax = (Number(price) * Number(formProducts.tax)) / 100;
                price = price + tax;
            }
            setFormProducts(formProducts => ({...formProducts, [otherName]: price.toFixed(2) }));
        }
    }, [formProducts.porcentagePrice]);


    console.log(formProducts);
    const onDeleteProducts = async (id: any) => {
        const data = {
            enabled: false,
        };
        await updatedProducts(id, data);
        setOpenDelete(!openDelete);
    }

    const onSaveProducts = async () => {
        if(formProducts.productType === 1){
            const createProduct : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                statusProduct: formProducts.statusProduct,
                quantity: formProducts.quantity,
                tax: formProducts.tax,
                price: Number(formProducts.price),
                expirationDate: formProducts.expirationDate,
                expirationAlert: formProducts.expirationAlert,
                priceBurchase: Number(formProducts.priceBurchase),
                porcentagePrice: formProducts.porcentagePrice,
                productType: Number(formProducts.productType),
                enabled: formProducts.enabled,
                description: formProducts.description,
            };
            await saveProducts(createProduct);
        }else {
            const createService : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                expirationDate: '',
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
            tax: 0,
            statusProduct: 1,
            price: 0,
            porcentagePrice: 0,
            expirationAlert: 0,
            expirationDate: '',
            priceBurchase: 0,
            productType: 1,
            user: 1,
            enabled: true,
        });
        setOpen(false);
    }

    const onUpdatedProducts = async (id: any) => {

        if(formProducts.productType === 1){
            const createUpdated : any = {
                name: formProducts.name,
                user: authLogin.idUser,
                tax: Number(formProducts.tax),
                quantity: Number(formProducts.quantity),
                price: Number(formProducts.price),
                priceBurchase: Number(formProducts.priceBurchase),
                productType: Number(formProducts.productType),
                enabled: formProducts.enabled,
                expirationDate: formProducts.expirationDate,
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
                expirationDate: formProducts.expirationDate,
                description: formProducts.description,
            };
            await updatedProducts(id, createUpdated);
        }

        setFormProducts({
            name: '',
            description: '',
            statusProduct: 1,
            tax: 0,
            quantity: 0,
            price: 0,
            porcentagePrice: 0,
            expirationAlert: 0,
            priceBurchase: 0,
            expirationDate: '',
            productType: 1,
            user: 1,
            enabled: true,
        });
        setOpen(false);
    }

    useEffect(() => {
        formProducts.productType === 2 ? setDisable(true) : setDisable(false);
    }, [formProducts.productType]);

    useEffect(() => {
        const dataList: any = products.filter((item: any) => item.name.toLocaleUpperCase().includes(valueInputX.toLocaleUpperCase()));
        setProductsSearch(dataList);
    }, [valueInputX])


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
                            setValueInput={setValueInputX}
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
                                        {(valueInputX ? productsSearch : products).slice(0,6).map((product: any) => (
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
                                                                            expirationDate: '',
                                                                            statusProduct: 1,
                                                                            tax: product.porcentagePrice,
                                                                            porcentagePrice: product.porcentagePrice,
                                                                            expirationAlert: product.expirationAlert,
                                                                            price: product.price,
                                                                            priceBurchase: product.priceBurchase,
                                                                            productType: product.productType?.id,
                                                                            user: product.user.id,
                                                                            enabled: product.enabled,
                                                                        });
                                                                    }}
                                                                    className="border border-transparent rounded-md shadow-sm py-2 px-3 text-base font-medium text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                                                >
                                                                    <EditIcons class={'text-blue-500'} h={'h-6'} w={'w-6'} />
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setId(product.id);
                                                                        setOpenDelete(!openDelete);
                                                                    }}
                                                                    className="border border-transparent rounded-md shadow-sm py-2 px-3 text-base font-medium text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                                                >
                                                                    <TrashDeleteIcons class={'text-red-500'} h={'h-6'} w={'w-6'} />
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
                <DeleteModalComponents
                    open={openDelete}
                    closeDeleteModal={() => setOpenDelete(!openDelete)}
                    titleModal={'Desea Eliminar'}
                    actions={() => onDeleteProducts(idd)}
                />
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
                                            {/* <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Codigo de Producto o Servicio
                                                </label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    onChange={changesHandleProducts}
                                                    placeholder={'Codigo Producto o Servicio'}
                                                    value={formProducts.name}
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                />
                                            </div> */}
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
                                                            name: 'Medicamentos'
                                                        },
                                                        {
                                                            id: 2,
                                                            name: 'Cosmeticos'
                                                        },
                                                        {
                                                            id: 3,
                                                            name: 'Cereales'
                                                        },
                                                        {
                                                            id: 4,
                                                            name: 'Lacteos'
                                                        },
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
                                                            defaultValue={formProducts.priceBurchase}
                                                            onChange={changesHandleProducts}
                                                            name="priceBurchase"
                                                            placeholder={'Precio Compra'}
                                                            id="price-bucharse"
                                                            className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                        />
                                                </div>
                                                <div className={'col-span-2'}>
                                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                            Porcentage de venta %
                                                        </label>
                                                        <div className="grid grid-cols-4 gap-4">
                                                            <div className={'col-span-1'}>
                                                                <input
                                                                    type={"checkbox"}
                                                                    defaultChecked={pocentage}
                                                                    onClick={() => setPocentage(!pocentage)}
                                                                    name="porcentageKey"
                                                                    placeholder={'Insertar porcentage de venta'}
                                                                />
                                                            </div>
                                                            {
                                                                pocentage ?
                                                                    <>
                                                                        <div className={'col-span-3'}>
                                                                            <input
                                                                                type="number"
                                                                                value={formProducts.porcentagePrice}
                                                                                max={100}
                                                                                onChange={changesHandleProducts}
                                                                                name="porcentagePrice"
                                                                                placeholder={'Insertar porcentage de venta'}
                                                                                className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                                            />
                                                                        </div>
                                                                    </> : null
                                                            }
                                                        </div>
                                                </div>
                                                <div className={'col-span-2'}>
                                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                            Precio Venta
                                                        </label>
                                                        {
                                                            pocentage ?
                                                                <>
                                                                    <span className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md">
                                                                    {formProducts.price}
                                                                </span> 
                                                                </> : <>
                                                                <input
                                                                        type={"number"}
                                                                        value={Number(formProducts.price)}
                                                                        onChange={changesHandleProducts}
                                                                        name={"price"}
                                                                        placeholder={'Precio Venta'}
                                                                        className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                                    />
                                                                </> 
                                                        }
                                                </div>
                                                
                                                </div>
                                            </div>
                                            <div className={'col-span-2'}>
                                                <div className="grid grid-cols-6">
                                                    <div className={'col-span-3'}>
                                                            <label htmlFor="inpuestoeKey">
                                                                <input
                                                                        type={"checkbox"}
                                                                        defaultChecked={inpuesto}
                                                                        onClick={() => setInpuesto(!inpuesto)}
                                                                        name="inpuestoeKey"
                                                                    /> Impuesto %
                                                            </label>
                                                    </div>
                                                    <div className={'col-span-3'}>
                                                        {
                                                                    inpuesto ?
                                                                                <input
                                                                                    type="number"
                                                                                    value={formProducts.tax}
                                                                                    onChange={changesHandleProducts}
                                                                                    name="tax"
                                                                                    placeholder={'Insertar Impuestos'}
                                                                                    className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                                                />
                                                                    : null
                                                                }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={'col-span-6'}>

                                                <div className={'grid grid-cols-6 gap-4'}>


                                                <div className={'col-span-2'}>
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
                                                    </div>


                                                    <div className={'col-span-2'}>
                                                                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                                                                    Alertar cuando queden
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={formProducts.expirationAlert}
                                                                    disabled={disable}
                                                                    onChange={changesHandleProducts}
                                                                    name="expirationAlert"
                                                                    className="mt-1 focus:ring-indigo-500 p-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-200 rounded-md"
                                                                />
                                                                </div>

                                                    <div className={'col-span-2'}>
                                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                            Cantidad
                                                        </label>
                                                        <input
                                                            type="number"
                                                            defaultValue={formProducts.quantity}
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
                                            {
                                                formProducts.price && formProducts.quantity ? 
                                            <div className="col-span-6">
                                                <div className="rounded-md bg-blue-50 p-4">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                        <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                                        </div>
                                                        <div className="ml-3 flex-1 md:flex md:justify-between">
                                                        <p className="text-sm text-blue-700">Cantidad a recibir cuando venda todos las unidades</p>
                                                            <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                                                { formProducts.price * formProducts.quantity }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>: null
                                            }
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
                                              updated ?
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
