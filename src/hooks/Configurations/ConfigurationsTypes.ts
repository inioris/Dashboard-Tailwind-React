const TypesConfigurations: any = {
    GET_CONFIGURATIONS: 'GET_CONFIGURATIONS',
    SAVE_CONFIGURATIONS: 'SAVE_CONFIGURATIONS',
}

function ConfigurationsTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesConfigurations.SAVE_CONFIGURATIONS:
        case TypesConfigurations.GET_CONFIGURATIONS:
            return {
                ...state, configurations: payload.configurations
            };
        default:
            return state;
    }
}
export { TypesConfigurations };
export default ConfigurationsTypes;