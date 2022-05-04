import { useDispatchSale } from "./StoreProvider";
import { TypesSale } from './saleTypes';
import urlApi from "../../dataApi/urlApi";
import { getId, postAll, updateAll } from "../globalMethod";

export function useSale() {
    const dispatch = useDispatchSale();
    return {
        async  getAllSale(id: number | string){
            const sale: any = await getId(`${urlApi}/sale-products`);
            dispatch({
                type: TypesSale.GET_SALE,
                payload: {
                    sale,
                },
            })
        },
        async  saveUsers(data: any){
            await postAll(`${urlApi}/sale-products`, data).then(async (res: any) => {
                if (res.status === 200){
                    const sale: any = await getId(`${urlApi}/sale-products`);
                    dispatch({
                        type: TypesSale.SAVE_SALE,
                        payload: {
                            sale,
                        },
                    })
                }
            });
        },
        async  updatedUsers(id: number | string, data: any){
            await updateAll(`${urlApi}/sale-products`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const sale: any = await getId(`${urlApi}/sale-products`);
                    dispatch({
                        type: TypesSale.GET_SALE,
                        payload: {
                            sale,
                        },
                    })
                }
            });
        },
    }
}
