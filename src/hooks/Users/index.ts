import { useDispatchUsers } from "./StoreProvider";
import { TypesUsers } from './usersTypes';
import urlApi from "../../dataApi/urlApi";
import { getId, postAll, updateAll } from "../globalMethod";

export function useUsers() {
    const dispatch = useDispatchUsers();
    return {
        async  getAllUsers(_id: number | string){
            const users: any = await getId(`${urlApi}/users`);
            dispatch({
                type: TypesUsers.GET_USERS,
                payload: {
                    users,
                },
            })
        },
        async  saveUsers(data: any){
            await postAll(`${urlApi}/users`, data).then(async (res: any) => {
                if (res.status === 200){
                    const users: any = await getId(`${urlApi}/users`);
                    dispatch({
                        type: TypesUsers.SAVE_USERS,
                        payload: {
                            users,
                        },
                    })
                }
            });
        },
        async  updatedUsers(id: number | string, data: any){
            await updateAll(`${urlApi}/users`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const users: any = await getId(`${urlApi}/users`);
                    dispatch({
                        type: TypesUsers.GET_USERS,
                        payload: {
                            users,
                        },
                    })
                }
            });
        },
    }
}
