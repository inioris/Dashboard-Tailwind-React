import { createContext, useContext, useReducer } from 'react';
import { TypesSale } from './saleTypes';
const StoreContextSale = createContext<any | null>(null);

function StoreReducerSale(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesSale.SAVE_SALE:
        case TypesSale.GET_SALE:
            return {
                ...state,
                sale: payload.sale.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    sale: [],

}


export default function StoreProviderSale({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerSale, inicialState);

    return (
        <StoreContextSale.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextSale.Provider>
    )
}

const useStoreSale = () => useContext(StoreContextSale)[0];
const useDispatchSale = () => useContext(StoreContextSale)[1];

export { StoreContextSale, useStoreSale, useDispatchSale, TypesSale };


