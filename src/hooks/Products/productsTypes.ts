const TypesProducts : any = {
    GET_PRODUCTS: 'GET_PRODUCTS',
    SAVE_PRODUCTS: 'SAVE_PRODUCTS',
}

function ProductsTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesProducts.SAVE_PRODUCTS:
        case TypesProducts.GET_PRODUCTS:
            return {
                ...state, users: payload.users
            };
        default:
            return state;
    }
}
export { TypesProducts };
export default ProductsTypes;