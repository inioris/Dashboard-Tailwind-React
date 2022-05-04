const TypesUsers = {
    GET_USERS: 'GET_USERS',
    SAVE_USERS: 'SAVE_USERS',
}

function UsersTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesUsers.SAVE_USERS:
        case TypesUsers.GET_USERS:
            return {
                ...state, users: payload.users
            };
        default:
            return state;
    }
}
export { TypesUsers };
export default UsersTypes;