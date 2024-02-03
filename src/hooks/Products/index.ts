import { useDispatchProducts } from "./StoreProvider";
import { TypesProducts } from './productsTypes';
import { getId, postAll, updateAll } from "./../globalMethod";
import urlApi from '../../dataApi/urlApi';

export function useProducts() {
    const dispatch : any = useDispatchProducts();
    return {
        async getAllProducts(query?: any){
            const products: any = await getId(`${urlApi}/products?enabled=1`);
            dispatch({
                type: TypesProducts.GET_PRODUCTS,
                payload: {
                    products,
                },
            })
        },
        async saveProducts(data: any){
            await postAll(`${urlApi}/products`, data).then(async (res: any) => {
                if (res.status === 200){
                    const products: any = await getId(`${urlApi}/products`);
                    dispatch({
                        type: TypesProducts.SAVE_PRODUCTS,
                        payload: {
                            products,
                        },
                    })
                }
            });
        },
        async updatedProducts(id: number | string, data: any){
            await updateAll(`${urlApi}/products`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const products: any = await getId(`${urlApi}/products?enabled=1`);
                    dispatch({
                        type: TypesProducts.GET_PRODUCTS,
                        payload: {
                            products,
                        },
                    })
                }
            });
        },
    }
}
