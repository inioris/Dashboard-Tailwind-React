import { useDispatchCheckIn } from "./StoreProvider";
import { TypesCheckIn } from './checkInTypes';
import urlApi from "../../dataApi/urlApi";
import { getId, postAll, updateAll } from "../globalMethod";

export function useCheckIn() {
    const dispatch = useDispatchCheckIn();
    return {
        async  getAllCheckIn(_id: number | string){
            const checkIn: any = await getId(`${urlApi}/check-ins`);
            dispatch({
                type: TypesCheckIn.GET_CHECK_IN,
                payload: {
                    checkIn,
                },
            })
        },
        async  saveCheckIn(data: any){
            await postAll(`${urlApi}/check-ins`, data).then(async (res: any) => {
                if (res.status === 200){
                    const checkIn: any = await getId(`${urlApi}/check-ins`);
                    dispatch({
                        type: TypesCheckIn.SAVE_CHECK_IN,
                        payload: {
                            checkIn,
                        },
                    })
                }
            });
        },
        async  updatedCheckIn(id: number | string, data: any){
            await updateAll(`${urlApi}/check-ins`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const checkIn: any = await getId(`${urlApi}/check-ins`);
                    dispatch({
                        type: TypesCheckIn.GET_CHECK_IN,
                        payload: {
                            checkIn,
                        },
                    })
                }
            });
        },
    }
}
