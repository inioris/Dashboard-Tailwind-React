import jwt_decode from "jwt-decode";


const decodeTokenInfoUsers = () => {
    if (global.window?.localStorage.AuthToken) {
        return jwt_decode(`${global.window ? localStorage.getItem('AuthToken') : null}`);
    }
}

export default decodeTokenInfoUsers;
