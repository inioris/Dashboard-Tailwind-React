import StoreProviderProducts from './Products/StoreProvider';
import StoreProviderUsers from './Users/StoreProvider';
import StoreProviderStatusProducts from './StatusProducts/StoreProvider';
import StoreProviderSale from './Sale/StoreProvider';
import StoreProviderCheckIn from './CheckIn/StoreProvider';
import StoreProviderServices from './Services/StoreProvider';
import StoreProviderCategory from './Category/StoreProvider';



export default function GlobalStore({children}: any) {
    return (
        <>
                <StoreProviderCheckIn>
                        <StoreProviderSale>
                            <StoreProviderProducts>
                                <StoreProviderUsers>
                                    <StoreProviderStatusProducts>
                                        <StoreProviderServices>
                                            <StoreProviderCategory>
                                                {
                                                    children
                                                }
                                            </StoreProviderCategory>
                                        </StoreProviderServices>
                                    </StoreProviderStatusProducts>
                                </StoreProviderUsers>
                            </StoreProviderProducts>
                        </StoreProviderSale>
                    </StoreProviderCheckIn>
        </>
    );
}
