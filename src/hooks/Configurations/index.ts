import { useDispatchConfigurations } from "./StoreProvider";
import { TypesConfigurations } from './ConfigurationsTypes';
import urlApi from "../../dataApi/urlApi";
import { getId, postAll, updateAll } from "../globalMethod";

export function useConfigurations() {
    const dispatch = useDispatchConfigurations();
    return {
        async  getAllConfigurations(){
            const configurations: any = await getId(`${urlApi}/configurations`);
            dispatch({
                type: TypesConfigurations.GET_CONFIGURATIONS,
                payload: {
                    configurations,
                },
            })
        },
        async  updatedConfigurations(id: number | string, data: any){
            await updateAll(`${urlApi}/check-ins`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const configurations: any = await getId(`${urlApi}/configurations`);
                    dispatch({
                        type: TypesConfigurations.GET_CONFIGURATIONS,
                        payload: {
                            configurations,
                        },
                    })
                }
            });
        },
    }
}
