import { Fragment, useState } from 'react';
import CheckCircleIcons from '../../icons/CheckCircleIcons';
import CancelIcons from '../../icons/DeleteIcons';
import { Transition } from '@headlessui/react';


interface INotificationProps {
    show?: boolean;
    changesShow?: any;
    message?: string;
    subMessage?: string;
}


export default function Notification(props: INotificationProps) {
  
    return (
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="absolute inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
          
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={props.show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcons w='w-6' h='h-6' class='text-green-400' />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900"> {props.message} </p>
                      <p className="mt-1 text-sm text-gray-500"> { props.subMessage } </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={props.changesShow}
                      >
                        <span className="sr-only">Close</span>
                        <CancelIcons w='w-5' h='h-5' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    )
  }
