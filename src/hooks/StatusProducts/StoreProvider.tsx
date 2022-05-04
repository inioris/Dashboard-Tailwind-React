import { createContext, useContext, useReducer } from 'react';
import { TypesStatusProducts } from './statusProductsTypes';
const StoreContextStatusProducts = createContext<any | null>(null);

function StoreReducerStatusProducts(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesStatusProducts.SAVE_STATUS_PRODUCTS:
        case TypesStatusProducts.GET_STATUS_PRODUCTS:
            return {
                ...state,
                statusProducts: payload.statusProducts.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    statusProducts: [],

}


export default function StoreProviderStatusProducts({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerStatusProducts, inicialState);

    return (
        <StoreContextStatusProducts.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextStatusProducts.Provider>
    )
}

const useStoreStatusProducts = () => useContext(StoreContextStatusProducts)[0];
const useDispatchStatusProducts = () => useContext(StoreContextStatusProducts)[1];

export { StoreContextStatusProducts, useStoreStatusProducts, useDispatchStatusProducts, TypesStatusProducts };


