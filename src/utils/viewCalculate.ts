
interface ICalculateAllTotals {
    price: any[];
    g?: boolean;
    isProducts: boolean;

};

export default function ICalculateAllTotality(data: ICalculateAllTotals) {

    let totality: number =  0;
    let totalPriceBurchase: number = 0;

    if(data.isProducts && !data.g){
        data.price.map((item: any) => {
            if(item.productType === 1){
                totality = totality + item.price;
            }
        });
        return totality;
    }

    if(data.isProducts && data.g){
        data.price.map((item: any) => {
            if(item.productType === 1){
                totalPriceBurchase = totalPriceBurchase + item.price;
            }
        });
        return totalPriceBurchase;
    }
    
    if(data.g){
        data.price.map((item: any) => {
            totalPriceBurchase = totalPriceBurchase + item.priceBurchase;
        });
        return totalPriceBurchase;
    }

    data.price.map((item: any) => {
        totality = totality + item.price;
        totalPriceBurchase = totalPriceBurchase + item.priceBurchase;
    }) 

    return totality;

}