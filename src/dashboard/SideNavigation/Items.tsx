import data from "./Data";
import { Link } from 'react-router-dom';

const style : any = {
    active: `font-normal mx-4 text-sm text-blue-600`,
    inactive: `font-light mx-4 text-sm text-gray-900`,
    link: `inline-flex items-center justify-start my-1 p-3 text-black`,
};

export default function SidenavItems() {
    const { pathname }: any = window?.location.pathname;

    return (
        <ul className="mt-6 md:pl-4 pr-2">
            <li style={{cursor: 'pointer'}}>
                <div className={'grid grid-cols-3 gap-px'}>
                    <div><span className={`text-xs`}>Principal</span></div>
                    <div className="col-span-2" style={{ marginTop: '14px' }}><hr /></div>
                </div>
                {data.principal.map((section: any) => (
                    <>
                        <div className={section.link === pathname ? `${style.active}` : `hover:bg-gray-100 hover:shadow-none hover:rounded`}>
                            <Link to={section.link} style={{ cursor: 'pointer' }}>
                                <span className={style.link}>
                                    <span>{section.icon}</span>
                                        <span className={`${section.link === pathname ? style.active : style.inactive} sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xl`}>                                 
                                            { section.section }
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </>
                ))}
            </li>
            <li style={{cursor: 'pointer'}}>
                <div className={'grid grid-cols-3'}>
                    <div><span className={`text-xs`}>Mantenimiento</span></div>
                    <div className="col-span-2" style={{marginTop: '14px'}}><hr /></div>
                </div>
                {data.mantenimiento.map((section: any) => (
                    <>

                            <div className={section.link === pathname ? style.active : 'hover:bg-gray-100 hover:shadow-none hover:rounded'}>
                                <Link to={section.link} style={{ cursor: 'pointer' }}>
                                    <span className={style.link}>
                                        <span>{section.icon}</span>
                                        <span className={`${section.link === pathname ? style.active : style.inactive} sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xl`
                                        }>
                                        { section.section }
                                        </span>
                                    </span>
                                </Link>
                            </div>
                    </>
                ))}
            </li>
        </ul>
    );
}
