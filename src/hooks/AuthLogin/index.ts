import { useDispatchAuthLogin } from "./StoreProvider";
import { TypesAuthLogin } from './AuthLoginTypes';
import jwt from 'jwt-decode';
import urlApi from "../../dataApi/urlApi";
import { postAll } from "../globalMethod";

interface IUsersLogin {
    username: string;
    password: string;
}

export interface IDataUsersLoggers {
    "idUser": number | string;
    "name": string;
    // "rol": number | string;
    // "authorizedBy": number | string;
    "username": string;
    "email": string;
}


export function useAuthLogin() {
    const dispatch = useDispatchAuthLogin();
    return {
        async postAuthLogin(dataUsers: IUsersLogin){
            const authLogin: any = (await postAll(`${urlApi}/login`, dataUsers)).data;
            localStorage.setItem('AuthToken', authLogin);
        },
        async getAuthLogin() {
            if (global.window?.localStorage.AuthToken){
                const authLogin : any = localStorage.getItem('AuthToken');
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