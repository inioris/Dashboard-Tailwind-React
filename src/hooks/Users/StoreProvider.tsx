import { createContext, useContext, useReducer } from 'react';
import { TypesUsers } from './usersTypes';
const StoreContextUsers = createContext<any | null>(null);

function StoreReducerUsers(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesUsers.SAVE_USERS:
        case TypesUsers.GET_USERS:
            return {
                ...state,
                users: payload.users.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    users: [],
}


export default function StoreProviderUsers({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerUsers, inicialState);

    return (
        <StoreContextUsers.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextUsers.Provider>
    )
}

const useStoreUsers = () => useContext(StoreContextUsers)[0];
const useDispatchUsers = () => useContext(StoreContextUsers)[1];

export { StoreContextUsers, useStoreUsers, useDispatchUsers, TypesUsers };


