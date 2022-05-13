import { useDispatchAuthLogin } from "./StoreProvider";
import { TypesAuthLogin } from './AuthLoginTypes';
import jwt from 'jwt-decode';
import urlApi from "../../dataApi/urlApi";
import { postAll } from "../globalMethod";
import { setAuthorizationToken } from "../../utils/setAuthorizationToken";

interface IUsersLogin {
    username: string;
    password: string;
}

export interface IDataUsersLoggers {
    "id": number | string;
    "name": string;
    "rol": number | string;
    "authorizationBy": number | string;
    "user": string;
    "email": string;
}


export function useAuthLogin() {
    const dispatch = useDispatchAuthLogin();
    return {
        async postAuthLogin(dataUsers: IUsersLogin){
            const authLogin: any = (await postAll(`${urlApi}/login`, dataUsers)).data;
            localStorage.setItem('AuthToken', authLogin);
            setAuthorizationToken(authLogin);
        },
        getAuthLogin() {
            if (global.window?.localStorage.AuthToken){
                const authLogin : any = localStorage.getItem('AuthToken');
                console.log(authLogin, 'no');
                dispatch({
                    type: TypesAuthLogin.GET_AUTHLOGIN,
                    payload: {
                        authLogin: jwt(authLogin) as IDataUsersLoggers,
                    },
                });
            }
        }
    }
}