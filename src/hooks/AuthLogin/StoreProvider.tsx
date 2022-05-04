import { createContext, useContext, useReducer } from 'react';
import { TypesAuthLogin } from './AuthLoginTypes';
const StoreContextAuthLogin = createContext<any | null>(null);

function StoreReducerAuthLogin(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesAuthLogin.POST_AUTHLOGIN:
            return {
                ...state,
                authLogin: payload.authLogin,
            };
        case TypesAuthLogin.GET_AUTHLOGIN:
            return {
                ...state,
                authLogin: payload.authLogin,
            };
        default:
            return state;
    }
}

const inicialState : any = {
    authLogin: {},
}


export default function StoreProviderAuthLogin({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerAuthLogin, inicialState);

    return (
        <StoreContextAuthLogin.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextAuthLogin.Provider>
    )
}

const useStoreAuthLogin = () => useContext(StoreContextAuthLogin)[0];
const useDispatchAuthLogin = () => useContext(StoreContextAuthLogin)[1];

export { StoreContextAuthLogin, useStoreAuthLogin, useDispatchAuthLogin, TypesAuthLogin };