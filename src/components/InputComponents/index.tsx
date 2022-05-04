interface IContentProps {
    name?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    wrapperClass?: string;
    value?: any;
    error?: string;
    classLabel?: string;
    requiredFiels?: boolean;
    autoCompleteInput?: boolean;
    disable?: boolean;
    max?: number;
    id?: string;
    icon?: Element | any;
}


export default function Input(props: IContentProps) {
    return (
        <>
            <div>
                {props.icon ?
                    <div className={'grid grid-cols-12 gap-4'}>
                        <div className={'col-span-1'}>
                            {
                                props.icon
                            }
                        </div>
                        <div className={'col-span-10'}>
                            <label htmlFor={props.name} className={props.classLabel}>&nbsp; {props.label} </label>
                        </div>
                    </div> : <label htmlFor={props.name} className={props.classLabel}>&nbsp; {props.label} </label>
                }
                <input
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    className={`${props.wrapperClass}`}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    value={props.value}
                    required={props.requiredFiels}
                    autoComplete={props.autoCompleteInput === true ? 'on' : 'off'}
                    disabled={props.disable}
                    maxLength={props.max}
                    min={0}
                />
            </div>
        </>
    )
}
