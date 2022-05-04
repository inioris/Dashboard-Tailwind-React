import { useDispatchProducts } from "./StoreProvider";
import { TypesProducts } from './productsTypes';
import { getId, postAll, updateAll } from "./../globalMethod";
import urlApi from '../../dataApi/urlApi';

export function useProducts() {
    const dispatch : any = useDispatchProducts();
    return {
        async getAllProducts(_id: number | string){
            const products: any = await getId(`${urlApi}/products`);
            dispatch({
                type: TypesProducts.GET_PRODUCTS,
                payload: {
                    products,
                },
            })
        },
        async saveProducts(data: any){
            await postAll(`${process.env.REACT_API_URL}/products`, data).then(async (res: any) => {
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
            await updateAll(`${process.env.REACT_API_URL}/products`, id, data).then(async (res: any) => {
                if (res.status === 200){
                    const products: any = await getId(`${urlApi}/products`);
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