const TypesCheckIn: any = {
    GET_CHECK_IN: 'GET_CHECK_IN',
    SAVE_CHECK_IN: 'SAVE_CHECK_IN',
}

function CheckInTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesCheckIn.SAVE_CHECK_IN:
        case TypesCheckIn.GET_CHECK_IN:
            return {
                ...state, checkIn: payload.checkIn
            };
        default:
            return state;
    }
}
export { TypesCheckIn };
export default CheckInTypes;