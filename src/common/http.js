import axios from 'axios';
axios.defaults.withCredentials = true

/**
 * axios 请求方法
 * @param {*} type 请求方式
 * @param {*} url 请求地址
 * @param {*} data 请求数据
 * @param {*} {Promise} 
 */
export function http(type, url, data = {}){
    return new Promise((resolve,reject) => {
        axios[type](url,data)
            .then(response =>{
                resolve(response.data); 
            }, err =>{
                reject(err);
            })
    })
}