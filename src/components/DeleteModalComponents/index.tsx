import TrashDeleteIcons from "../../icons/trashDeleteIcons";

interface IContentProps {
    messageText?: string;
    actions?: () => void;
    closeDeleteModal?: () => void;
    titleModal: string;
    subTitleModal?: string;
    open: boolean;
}

export default function DeleteModalComponents(props: IContentProps) {

    return (
        <>
            {props.open ? (
                <>
                    <div className="fixed justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
                        <div className="justify-center pt-8 m-auto" style={{ width: '500px' }}>
                            <div className="py-3 sm:max-w-xl sm:mx-auto">
                                <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                                    <div className="px-12 py-5 w-full flex flex-col items-end">
                                        <span className="text-gray-600 text-2xl font-semibold focus:outline-none" style={{cursor: 'pointer'}} onClick={ props.closeDeleteModal }>x</span>
                                    </div>
                                    <div className="border-t border-b p-8 flex flex-col items-center">
                                        <div className="text-center p-5 flex justify-center">
                                            <TrashDeleteIcons class={'text-red-500'} h={'h-16'} w={'w-16'} />
                                        </div>
                                        <div className="text-center flex justify-center">
                                            <p className="text-sm text-gray-500">{ props.subTitleModal }</p>
                                        </div>
                                        <div className="text-center flex justify-center">
                                            <h2 className="text-xl font-bold"> { props.titleModal } </h2>
                                        </div>
                                    </div>
                                    <div className="h-20 flex flex flex-col justify-center pr-2">
                                        <div style={{textAlign: 'end'}}>
                                            <button className="py-2 px-4 text-sm text-red rounded bg-white mr-2 border border-red block md:inline-block" onClick={ props.closeDeleteModal }> Cancelar </button>
                                            <button className="py-2 px-4 text-sm text-white rounded bg-red-500 block md:inline-block" onClick={props.actions}> Eliminar </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

