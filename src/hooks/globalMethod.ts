import axios from 'axios';

const getAll = async (url: string) => {
    return await axios.get(url).then((res: any) => {
        return res.data.data
    });
};

const postAll = async (url: string, data: any) => {
    return await axios.post(`${url}`, data);
};

const getId = async (url: string) => {
    return await axios.get(`${url}`).then((res: any) => {
        return res.data;
    });
};

const updateAll = async (url: string, id: number | string, data: any) => {
    return await axios.put(`${url}/${id}`, data);
};

export { getAll, postAll, getId, updateAll};