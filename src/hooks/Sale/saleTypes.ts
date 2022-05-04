const TypesSale = {
    GET_SALE: 'GET_SALE',
    SAVE_SALE: 'SAVE_SALE',
}

function SaleTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesSale.SAVE_SALE:
        case TypesSale.GET_SALE:
            return {
                ...state, sale: payload.sale
            };
        default:
            return state;
    }
}
export { TypesSale };
export default SaleTypes;