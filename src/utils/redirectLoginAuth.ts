

const redirectLoginAuth = () => {
    if (global.window?.location.pathname !== '/login'
        && global.window?.localStorage.getItem('AuthToken') === null
        && global.window?.localStorage.getItem('AuthToken') === undefined){
        return global.window ? global.window.location.href = '/login' : null
    }

}

export default redirectLoginAuth;
