import RemoveIcons from '../../icons/RemoveIcons';

interface IPropsComponents {
    list?: any[];
    subTotal?: number | string;
    taxes?: number | string;
    discounts?: number | string;
    onClickSave?: any;
}
  
export default function ReceiptPayment(props: IPropsComponents) {
    return (
      <>
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
                                           props.list ? props.list.map((product: any, key: number) => (
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
                            ${props.subTotal}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Descuentos</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            ${props.discounts}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Impuestos</dt>
                        <dd className="text-sm font-medium text-gray-900">
                            ${props.taxes}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">
                            ${ Number(props.subTotal)  + Number(props.taxes) + Number(props.discounts) }
                        </dd>
                    </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        onClick={props.onClickSave}
                    >
                    Confirmar Orden
                    </button>
                </div>
                </div>
            </div>
        </div>
      </>
    )
  }