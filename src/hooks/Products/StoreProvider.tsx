import { createContext, useContext, useReducer } from 'react';
import { TypesProducts } from './productsTypes';
const StoreContextProducts = createContext<any | null>(null);

function StoreReducerProducts(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesProducts.SAVE_PRODUCTS:
        case TypesProducts.GET_PRODUCTS:
            return {
                ...state,
                products: payload.products.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    products: [],

}


export default function StoreProviderProducts({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerProducts, inicialState);

    return (
        <StoreContextProducts.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextProducts.Provider>
    )
}

const useStoreProducts = () => useContext(StoreContextProducts)[0];
const useDispatchProducts = () => useContext(StoreContextProducts)[1];

export { StoreContextProducts, useStoreProducts, useDispatchProducts, TypesProducts };


