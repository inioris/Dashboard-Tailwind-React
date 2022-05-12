import { createContext, useContext, useReducer } from 'react';
import { TypesServices } from './servicesTypes';
const StoreContextServices = createContext<any | null>(null);

function StoreReducerServices(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesServices.SAVE_SERVICES:
        case TypesServices.GET_SERVICES:
            return {
                ...state,
                services: payload.services.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    services: [],

}


export default function StoreProviderServices({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerServices, inicialState);

    return (
        <StoreContextServices.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextServices.Provider>
    )
}

const useStoreServices = () => useContext(StoreContextServices)[0];
const useDispatchServices = () => useContext(StoreContextServices)[1];

export { StoreContextServices, useStoreServices, useDispatchServices, TypesServices };


