import { useDispatchStatusProducts } from "./StoreProvider";
import { TypesStatusProducts } from './statusProductsTypes';
import urlApi from "../../dataApi/urlApi";
import { getId, postAll, updateAll } from "../globalMethod";

export function useStatusProducts() {
    const dispatch = useDispatchStatusProducts();
    return {
        async  getAllStatusProducts(_id: number | string){
            const statusProducts: any = await getId(`${urlApi}/status-products`);
            dispatch({
                type: TypesStatusProducts.GET_STATUS_PRODUCTS,
                payload: {
                    statusProducts,
                },
            })
        },
        async  saveStatusProducts(data: any){
            await postAll(`${urlApi}/status-products`, data).then(async (res: any) => {
                if (res.status === 200){
                    const statusProducts: any = await getId(`${urlApi}/status-products`);
                    dispatch({
                        type: TypesStatusProducts.SAVE_STATUS_PRODUCTS,
                        payload: {
                            statusProducts,
                        },
                    })
                }
            });
        },
        async  updatedStatusProducts(id: number | string, data: any){
            await updateAll(`${urlApi}/status-products`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const statusProducts: any = await getId(`${urlApi}/status-products`);
                    dispatch({
                        type: TypesStatusProducts.GET_STATUS_PRODUCTS,
                        payload: {
                            statusProducts,
                        },
                    })
                }
            });
        },
    }
}
