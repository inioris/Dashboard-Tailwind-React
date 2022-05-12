import { useDispatchCategory } from "./StoreProvider";
import { TypesCategory } from './categoryTypes';
import urlApi from "../../dataApi/urlApi";
import { getId, postAll, updateAll } from "../globalMethod";

export function useCategory() {
    const dispatch = useDispatchCategory();
    return {
        async  getAllCategory(_id: number | string){
            const category: any = await getId(`${urlApi}/category`);
            dispatch({
                type: TypesCategory.GET_CATEGORY,
                payload: {
                    category,
                },
            })
        },
        async  saveCategory(data: any){
            await postAll(`${urlApi}/category`, data).then(async (res: any) => {
                if (res.status === 200){
                    const category: any = await getId(`${urlApi}/category`);
                    dispatch({
                        type: TypesCategory.SAVE_CATEGORY,
                        payload: {
                            category,
                        },
                    })
                }
            });
        },
        async  updatedCategory(id: number | string, data: any){
            await updateAll(`${urlApi}/category`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const category: any = await getId(`${urlApi}/category`);
                    dispatch({
                        type: TypesCategory.GET_CATEGORY,
                        payload: {
                            category,
                        },
                    })
                }
            });
        },
    }
}
