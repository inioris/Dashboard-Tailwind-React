import { createContext, useContext, useReducer } from 'react';
import { TypesCategory } from './categoryTypes';
const StoreContextCategory = createContext<any | null>(null);

function StoreReducerCategory(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesCategory.SAVE_CATEGORY:
        case TypesCategory.GET_CATEGORY:
            return {
                ...state,
                category: payload.category.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    category: [],

}


export default function StoreProviderCategory({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerCategory, inicialState);

    return (
        <StoreContextCategory.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextCategory.Provider>
    )
}

const useStoreCategory = () => useContext(StoreContextCategory)[0];
const useDispatchCategory = () => useContext(StoreContextCategory)[1];

export { StoreContextCategory, useStoreCategory, useDispatchCategory, TypesCategory };


