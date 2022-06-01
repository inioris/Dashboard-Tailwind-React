import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";

interface IDataProps {
    list?: any,
    name?: string;
    subName?: string;
    date?: string;
    numberId?: number | string
}

async function BasicDocument(props: IDataProps) {

    const dataHTML: any =
        <div style={{ padding: '10px', width: '220px' }}>
            <div style={{ textAlign: 'center', paddingBottom: '10px'}}>
                <h5 style={{ fontSize: '6px'}}> { props.name } </h5>
                <p style={{ fontSize: '4px', margin: 'auto'}}>
                    AV. Wiston churchill, ciudad azul.
                </p>
            </div>
            <div style={{ paddingBottom: '10px'}}>
                <span style={{ float: 'left', fontSize: '4px' }}> Fecha venta y hora </span>
                <span style={{ float: 'right', fontSize: '4px', paddingRight: '6px' }}> Nº Trans. 00001</span>
            </div>

            <div style={{ paddingTop: '10px'}}>
                <table
                    id="tab_customers"
                    style={{ fontSize: '4px', justifyContent: 'center', width: '100%' }}
                    className="table table-striped">
                    <thead>
                    <tr className="warning">
                        <th>DESCRIPCION</th>
                        <th>UNIDAD</th>
                        <th>PRECIO</th>
                        <th>TOTAL</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{ textAlign: 'center' }}>Corte de Cabello</td>
                        <td style={{ textAlign: 'center' }}>1</td>
                        <td style={{ textAlign: 'center' }}>250.00</td>
                        <td style={{ textAlign: 'center' }}>250.00</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'center' }}>Tenis Nike 23</td>
                        <td style={{ textAlign: 'center' }}>3</td>
                        <td style={{ textAlign: 'center' }}>500.00</td>
                        <td style={{ textAlign: 'center' }}>1,500.00</td>
                    </tr>
                    <tr style={{ marginTop: '20px' }}>
                        <td style={{ textAlign: 'center' }}> <b>TOTAL A PAGAR</b> </td>
                        <td style={{ textAlign: 'center' }} />
                        <td style={{ textAlign: 'center' }} />
                        <td style={{ textAlign: 'center' }}> <b>1,750.00</b> </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ paddingTop: '10px', textAlign: 'center'}}>
                <p style={{ fontSize: '6px' }}> GRACIAS POR SU COMPRA </p>
            </div>
        </div>;

    const doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'credit-card'
    });
    const convert = renderToString(dataHTML);
    await doc.html(convert);
    doc.save("a4.pdf");
}
export default BasicDocument;
