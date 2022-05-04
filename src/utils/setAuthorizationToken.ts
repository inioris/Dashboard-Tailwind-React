import axios from 'axios';
import { set } from 'lodash';

export const setAuthorizationToken = (token: string) => {
    if (token){
        set(axios.defaults.headers, 'Authorization', `Bearer ${token}`)
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

