import { useEffect } from 'react';
import { useToggle } from "../Provider/Context";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuthLogin } from "../../hooks/AuthLogin";
import { useStoreAuthLogin } from "../../hooks/AuthLogin/StoreProvider";

export default function TopNavigation() {
    const { toggle } : any = useToggle();
    const { getAuthLogin } = useAuthLogin();

    const offCloseSectionToken = async () => {
        localStorage.clear();
        localStorage.removeItem("authtokenclient");
        delete axios.defaults.headers.common['authtokenclient'];
        return window.location.href = '/login';
    }

    useEffect(() => {
        getAuthLogin();
    }, []);

    return (
        <div className="h-16 md:h-20 shadow bg-white items-center relative z-10">
            <div className="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10">
                <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
                    <div className="flex group h-full items-center relative w-12">
                        <button
                            type="button"
                            aria-expanded="false"
                            aria-label="Toggle sidenav"
                            onClick={toggle}
                            className="text-4xl text-gray-700 focus:outline-none lg:hidden"
                        >
                            &#8801;
                        </button>
                    </div>
                    <div className="flex items-center justify-end ml-5 mr-0 p-1 relative text-gray-700 w-full sm:mr-0 sm:right-auto">
                    
                        <Link to={'/productos-y-servicios'} className="block pr-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </Link>
                        {/* <a href={'/'} className="block pr-5 relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </a> */}
                        <span className="block relative">
                            <img
                                style={{cursor: 'pointer'}}
                                onClick={offCloseSectionToken}
                                alt="Stone Cold Steve Austin"
                                src="/images/1.png"
                                className="h-10  object-cover rounded-full w-10"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
