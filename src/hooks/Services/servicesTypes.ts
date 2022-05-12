const TypesServices : any = {
    GET_SERVICES: 'GET_SERVICES',
    SAVE_SERVICES: 'SAVE_SERVICES',
}

function ServicesTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesServices.SAVE_SERVICES:
        case TypesServices.GET_SERVICES:
            return {
                ...state, services: payload.services
            };
        default:
            return state;
    }
}
export { TypesServices };
export default ServicesTypes;
