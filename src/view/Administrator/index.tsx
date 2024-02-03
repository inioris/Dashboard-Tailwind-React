import React, { useState } from 'react';


export default function Administrator() {

    const [ infoData, setInfoData ]  = useState({
      name: '',
      tax: 0,
      porcentagePrice: 0
    });

      const onChangesHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setInfoData(infoData => ({...infoData, [name]: value}))
      }
    
      return (<>
        <div className={'p-8'}>
          <div className={'p-8 bg-white rounded'}>
            <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Configuracion de Impuestos</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personaliza los impuestos de cada producto.</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nombre de Empresa</dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div>
                    <input 
                      type={"text"} 
                      name={"name"}
                      value={infoData.name}
                      onChange={onChangesHandle}
                      className={"block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                      placeholder={"Nombre de Empresa"} />
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Impuestos</dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div>
                    <input 
                        type={"number"} 
                        name={"tax"}
                        value={infoData.tax}
                        onChange={onChangesHandle}
                        className={"block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                        placeholder={"Impuestos"} />
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Porcentage de Venta</dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div>
                    <input 
                      type={"number"} 
                      name={"porcentagePrice"}
                      value={infoData.porcentagePrice}
                      onChange={onChangesHandle}
                      className={"block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                      placeholder={"Porcentage de Venta"} />
                  </div>
                </dd>
              </div>
            
              <div className="px-4 py-6 flex justify-end sm:gap-4 sm:px-0">
                  <button type={"button"} className={"rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>
                    Guardar
                  </button>
              </div>
            </dl>
          </div>
          </div>
        </div>
      </>);
}