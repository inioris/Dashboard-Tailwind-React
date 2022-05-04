import React from 'react';
import DeleteIcons from "../../icons/DeleteIcons";

interface IPropsModalComponenets {
    children: any;
    title?: string;
    onChanges?: void;
    closeFormModal?: () => void;
    openForm?: boolean;
    size?: string;
}

const ModalComponents = (props : IPropsModalComponenets) => {
    return (
        <>
            {
                props.openForm ? (
                    <div className="fixed justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
                        <div className="justify-center pt-8 m-auto" style={{ width: `${props.size ? props.size : '500px'}` }}>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className={'bg-white grid grid-cols-2 pr-3 pb-2'}>
                                        <div className={'col-span-1'}>
                                            <span className={'pt-4 pl-8 2xl:text-2xl'} style={{ float: 'left'}}>
                                                    {
                                                        props.title ?? props.title
                                                    }
                                            </span>
                                        </div>
                                        <div className={'col-span-1'}>
                                            <span className="pt-4 focus:outline-none" style={{cursor: 'pointer', float: 'right'}}>
                                                <div onClick={ props.closeFormModal }><DeleteIcons w={'w-6'} h={'h-6'}/></div>
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <>
                                        {
                                            props.children
                                        }
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
};

export default ModalComponents;
