const TypesCategory: any = {
    GET_CATEGORY: 'GET_CATEGORY',
    SAVE_CATEGORY: 'SAVE_CATEGORY',
}

function CategoryTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesCategory.SAVE_CATEGORY:
        case TypesCategory.GET_CATEGORY:
            return {
                ...state, category: payload.category
            };
        default:
            return state;
    }
}
export { TypesCategory };
export default CategoryTypes;