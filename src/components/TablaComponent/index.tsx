import Input from "../../components/InputComponents";
  
  interface IDataComponents {
      data?: any[];
      isMessage?: boolean;
      title?: string;
      message?: string;
      children: any;
      setValueInput?: any;
      classAditional?: string;
      descripcion?: string;
      inputSearch?: boolean;
  }
  
  export default function TableComponent(props: IDataComponents) {

      const onSearchProductsServices = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const {value} = e.target;
        props.setValueInput(value);
      }
    return (
      <div className={`${props.classAditional}`}>
        
        {
            props.isMessage ?
                <>
                  <div className={'grid grid-cols-2 gap-4'}>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl text-gray-900">
                                {
                                    props.title
                                }
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                {
                                    props.descripcion
                                }
                            </p>
                        </div>                 
                    </div>
                    {
                          props.inputSearch ?
                          <div>
                            <Input
                              type="text"
                              max={20}
                              placeholder={'Buscar Productos o Servicios'}
                              name={"searchProductsServices"}
                              onChange={onSearchProductsServices}
                              wrapperClass={"mt-1 focus:ring-indigo-500 p-2 pl-3 2xl:text-xl focus:border-indigo-500 block w-full border shadow-sm sm:text-sm border-gray-300 rounded-md"}
                            />
                          </div> : null
                        } 
                  </div> 
                </> 
                : null
        }

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    {
                      props.children
                    }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }