import { replace } from 'lodash';

const TransformData = (dateTransform?: Date, sales?: string) => {
    const monthNames = [
        'Enero', 'Febrero', 'Marzo',
        'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre',
        'Noviembre', 'Diciembre',
    ];
    if (dateTransform) {
        if (sales === 'sales'){
            return `${dateTransform.getDate() <= 9 ? '0' + dateTransform.getDate() : dateTransform.getDate()}${(Number(dateTransform.getMonth()) + 1) <= 9 ? '0' + (Number(dateTransform.getMonth()) + 1) : (Number(dateTransform.getMonth()) + 1)}${dateTransform.getFullYear()}`;
        }
        if (sales === 'today'){
            return `${dateTransform.getFullYear()}${(Number(dateTransform.getMonth()) + 1) <= 9 ? '0' + (Number(dateTransform.getMonth()) + 1) : (Number(dateTransform.getMonth()) + 1)}${dateTransform.getDate() <= 9 ? '0' + dateTransform.getDate() : dateTransform.getDate()}`;
        }
        return `${dateTransform.getDate()} ${monthNames[dateTransform.getMonth()]} ${dateTransform.getFullYear()} ${dateTransform.getHours()}:${dateTransform.getMinutes() > 9 ? dateTransform.getMinutes() : '0' + dateTransform.getMinutes()}`;
    }
    let dateTrans = replace(new Date().toLocaleString('en-DO', { timeZone: 'America/Santo_Domingo' }), '/', '-').replace('/', '-').replace(',', '');
    const b = `${dateTrans}`.substring(0, 2);
    if (!Number(b)) {
        dateTrans = `0${dateTrans}`;
    }
    const a = `${dateTrans}`.substring(0, 2);
    replace(`${dateTrans}`, '/', '-');

    dateTrans = replace(`${dateTrans}`, `${dateTrans}`.substring(0, 3), '');
    dateTrans = replace(`${dateTrans}`, '-', ` ${monthNames[Number(a) - 1]} `);
    return dateTrans;
};

export default TransformData;
