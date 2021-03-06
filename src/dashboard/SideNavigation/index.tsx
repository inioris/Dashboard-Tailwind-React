import SidenavItems from "./Items";
import Header from "./Header";
import css from "./style.module.css";
import { useToggle } from "../Provider/Context";

const style: any = {
    mobilePosition: {
        left: "left-0",
        right: "right-0",
    },
    close: `hidden`,
    container: `pb-32 lg:pb-6`,
    open: `absolute w-8/12 z-40 sm:w-5/12`,
    default: `bg-white shadow h-screen overflow-y-auto top-0 lg:block lg:relative lg:w-64 lg:z-auto`,
};

export default function SideNavigation({ mobilePosition }: any) {
    const { open, ref }: any = useToggle();
    return (
        <aside
            ref={ref}
            className={`${style.default} ${style.mobilePosition[mobilePosition]} 
       ${open ? style.open : style.close} ${css.scrollbar}`}
        >
            <div className={style.container}>
                <Header />
                <SidenavItems />
            </div>
        </aside>
    );
}
