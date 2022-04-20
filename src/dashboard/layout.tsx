import Overlay from "./Provider/Overlay";
import TopNavigation from "./TopNavigation";
import SideNavigation from "./SideNavigation";
import DashboardProvider from "./Provider/Context";

const style: any = {
    container: `bg-gray-100 h-screen overflow-hidden relative`,
    mainContainer: `flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-99`,
    main: `h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 md:px-8 lg:pt-0`,
};

export default function DashboardLayout({ children } : any) {
    return (
        <DashboardProvider>
            <div className={style.container}>
                <Overlay />
                <div className="flex items-start">
                    <SideNavigation mobilePosition="right" />
                    <div className={style.mainContainer}>
                        <TopNavigation />
                        <main className={style.main}>{children}</main>
                    </div>
                </div>
            </div>
        </DashboardProvider>
    );
}
