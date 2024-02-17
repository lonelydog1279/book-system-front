import axios from "axios";
import { ElMessage } from 'element-plus';

axios.defaults.baseURL = "/api";

export function message(msg, type) {
    ElMessage({
        message: msg,
        type: type,
        center: true,
        showClose: true,
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    })
}

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params,
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params,
    })
}
