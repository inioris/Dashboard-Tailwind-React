import IconSelects from "../../icons/CheckCircleIcons";


interface IContentProps {
    label?: string;
    data: any[];
    onChange?: (e: any) => void;
    type?: string;
    wrapperClass?: string;
    name?: string;
    defaultTextOption?: string;
    value?: any;
    error?: string;
    classLabel?: string;
    isLabel?: 'top' | 'left' | 'none';
    autoCompleteInput?: boolean;
    classSelect?: string;
    disable?: boolean;
    max?: number;
    difaultOption?: boolean;
    icon?: Element | any;
    classItem?: string;
}


export default function Select(props: IContentProps) {
    return (
        <>
                {
                 props.isLabel === 'left' ? (
                     <>
                         <div className={'grid grid-cols-5'}>
                             <div className={'pt-2 col-span-2'}>
                                 <span
                                     className={`${ props.classLabel ? props.classLabel : 'text-base text-gray-500'}`}>{props.label}</span>
                             </div>
                             <div className={'col-span-3'}>
                                 <div className={'relative inline-flex self-center'} style={{ width: '100%'}}>
                                     <IconSelects
                                         class={'text-gray absolute top-0 right-0 m-2 pointer-events-none rounded'}
                                     />
                                     <select style={{ width: '100%'}} onChange={props.onChange} name={props.name} className={`text-base font-normal pl-3 rounded border-2 border-gray-200 text-gray-600 h-12 bg-white hover:border-gray-400 focus:outline-none appearance-none ${props.classSelect}`}>
                                         <option>{props.defaultTextOption ? props.defaultTextOption : '-----------'}</option>
                                         {
                                             props.data.map((item: any) => {
                                                 return (
                                                     <>
                                                         <option value={item.value}>{ item.name }</option>
                                                     </>
                                                 )
                                             })
                                         }
                                     </select>
                                 </div>
                             </div>
                         </div>
                     </>) : null

                }
                {
                    props.isLabel === 'top' ? (
                        <>
                            <div className={'grid'}>
                                <div>
                                    <span className={`${ props.classLabel ? props.classLabel : 'text-sm text-dark'}`}>
                                        { props.label ? props.label : 'Seleccion una ciudad'}
                                    </span>
                                </div>
                                <div className={'relative inline-flex self-center'}>
                                    {/* <IconSelects
                                        
                                        class={'text-gray absolute top-0 right-0 m-2 pointer-events-none rounded'}
                                    /> */}
                                    <select
                                        style={{ width: '100%'}}
                                        name={props.name}
                                        onChange={props.onChange}
                                        defaultValue={props.value}
                                        className={props.classItem ? props.classItem : `text-base pl-3 rounded border-2 border-gray-200 h-10 bg-white hover:border-gray-400 focus:outline-none appearance-none ${props.classSelect}`}
                                    >
                                        {props.difaultOption ? <option>{ props.defaultTextOption ? props.defaultTextOption : '-----------' } </option> : ''}
                                        {
                                            props.data?.map((item: any) => {
                                                return (
                                                    <>
                                                        <option value={item.value | item.id}>
                                                            { item.name }
                                                        </option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : null
                }
                {
                    props.isLabel !== 'top' && props.isLabel !== 'left' && props.isLabel !== 'none' ? (
                        <div>
                            <div className={'relative inline-flex self-center'}>
                                <IconSelects
                                    class={'text-gray absolute top-0 right-0 m-2 pointer-events-none rounded'}
                                />
                                <select style={{ width: '100%'}} name={props.name} className={`text-base font-normal pl-3 rounded border-2 border-gray-200 text-gray-600 h-12 bg-white hover:border-gray-400 focus:outline-none appearance-none ${props.classSelect}`}>
                                    <option>-----------</option>
                                    {
                                        props.data.map((item: any) => {
                                            return (
                                                <>
                                                    <option value={item.value} className={ props.classItem ? props.classItem : '' }>
                                                        { item.name }
                                                    </option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    ) : null
                }
            {
                props.isLabel === 'none' ? (
                    <>
                        <div className={'grid'}>
                            <div className={'relative inline-flex self-center'}>
                                <IconSelects
                                    class={'text-gray absolute top-0 right-0 m-2 pointer-events-none rounded'}
                                />
                                <select style={{ width: '100%'}} name={props.name} className={props.classItem ? props.classItem : `text-base pl-3 rounded border-2 border-gray-200 h-10 bg-white hover:border-gray-400 focus:outline-none appearance-none ${props.classSelect}`}>
                                    {
                                        props.data.map((item: any) => {
                                            return (
                                                <>
                                                    <option value={item.value}>
                                                        { item.name }
                                                    </option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </>
                ) : null
            }
        </>
    )
}
