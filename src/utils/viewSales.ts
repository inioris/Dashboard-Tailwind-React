
interface ISalesCalculate {
    price: number;
    pricePucharse: number;
};

export default function CalculateSales(data: ISalesCalculate) {

    return data.price - data.pricePucharse;

}