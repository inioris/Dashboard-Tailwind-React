import { useDispatchServices } from "./StoreProvider";
import { TypesServices } from './servicesTypes';
import { getId, postAll, updateAll } from "./../globalMethod";
import urlApi from '../../dataApi/urlApi';

export function useServices() {
    const dispatch : any = useDispatchServices();
    return {
        async getAllServices(_id: number | string){
            const services: any = await getId(`${urlApi}/services`);
            dispatch({
                type: TypesServices.GET_SERVICES,
                payload: {
                    services,
                },
            })
        },
        async saveServices(data: any){
            await postAll(`${process.env.REACT_API_URL}/services`, data).then(async (res: any) => {
                if (res.status === 200){
                    const services: any = await getId(`${urlApi}/services`);
                    dispatch({
                        type: TypesServices.SAVE_SERVICES,
                        payload: {
                            services,
                        },
                    })
                }
            });
        },
        async updatedServices(id: number | string, data: any){
            await updateAll(`${urlApi}/services`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const services: any = await getId(`${urlApi}/services`);
                    dispatch({
                        type: TypesServices.GET_SERVICES,
                        payload: {
                            services,
                        },
                    })
                }
            });
        },
    }
}
