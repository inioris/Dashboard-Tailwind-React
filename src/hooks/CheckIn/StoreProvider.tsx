import { createContext, useContext, useReducer } from 'react';
import { TypesCheckIn } from './checkInTypes';
const StoreContextCheckIn = createContext<any | null>(null);

function StoreReducerCheckIn(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesCheckIn.SAVE_CHECK_IN:
        case TypesCheckIn.GET_CHECK_IN:
            return {
                ...state,
                checkIn: payload.checkIn.data
            };
        default:
            return state;
    }
}

const inicialState : any = {
    checkIn: [],

}


export default function StoreProviderCheckIn({ children } : any) {

    const [ store, dispatch ] = useReducer(StoreReducerCheckIn, inicialState);

    return (
        <StoreContextCheckIn.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextCheckIn.Provider>
    )
}

const useStoreCheckIn = () => useContext(StoreContextCheckIn)[0];
const useDispatchCheckIn = () => useContext(StoreContextCheckIn)[1];

export { StoreContextCheckIn, useStoreCheckIn, useDispatchCheckIn, TypesCheckIn };


