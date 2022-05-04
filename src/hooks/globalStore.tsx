import StoreProviderProducts from './Products/StoreProvider';
import StoreProviderUsers from './Users/StoreProvider';
import StoreProviderStatusProducts from './StatusProducts/StoreProvider';
import StoreProviderSale from './Sale/StoreProvider';
import StoreProviderCheckIn from './CheckIn/StoreProvider';
import StoreProviderAuthLogin from './AuthLogin/StoreProvider';



export default function GlobalStore({children}: any) {
    return (
        <>
                <StoreProviderCheckIn>
                        <StoreProviderSale>
                            <StoreProviderProducts>
                                <StoreProviderUsers>
                                    <StoreProviderStatusProducts>
                                        {
                                            children
                                        }
                                    </StoreProviderStatusProducts>
                                </StoreProviderUsers>
                            </StoreProviderProducts>
                        </StoreProviderSale>
                    </StoreProviderCheckIn>
        </>
    );
}