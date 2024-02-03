import { createContext, useContext, useReducer } from 'react';
import ConfigurationsTypes, { TypesConfigurations } from './ConfigurationsTypes';
const StoreContextConfigurations = createContext<any | null>(null);


const inicialState : any = {
    configurations: [],

}


export default function StoreProviderConfigurations({ children } : any) {

    const [ store, dispatch ] = useReducer(ConfigurationsTypes, inicialState);

    return (
        <StoreContextConfigurations.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextConfigurations.Provider>
    )
}

const useStoreConfigurations = () => useContext(StoreContextConfigurations)[0];
const useDispatchConfigurations = () => useContext(StoreContextConfigurations)[1];

export { StoreContextConfigurations, useStoreConfigurations, useDispatchConfigurations, TypesConfigurations };


