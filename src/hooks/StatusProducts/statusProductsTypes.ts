const TypesStatusProducts = {
    GET_STATUS_PRODUCTS: 'GET_STATUS_PRODUCTS',
    SAVE_STATUS_PRODUCTS: 'SAVE_STATUS_PRODUCTS',
}

function StatusProductsTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesStatusProducts.SAVE_STATUS_PRODUCTS:
        case TypesStatusProducts.GET_STATUS_PRODUCTS:
            return {
                ...state, statusProducts: payload.statusProducts
            };
        default:
            return state;
    }
}
export { TypesStatusProducts };
export default StatusProductsTypes;