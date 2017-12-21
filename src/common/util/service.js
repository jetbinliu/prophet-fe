
'use strict';

import axios from 'axios';

//控制ajax请求超时时间，单位毫秒
axios.defaults.timeout =  2592000000;

let querystring = require('querystring');
let showErrTip = true;

/**
 * 添加对响应的统一处理（在其被then或catch前）
 */
axios.interceptors.response.use((res) => {
    let data = res.data;
    let code = data.code;

    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

     // 后端返回未登录状态，则强制跳转到登录页
    if (res.data.status === 2 && res.data.message === 'unlogin') {
        window.location.href = 'login.html';
        return;
    }

    if (code === 0 || isNaN(code)) {
        return data;
    } else {

        if (showErrTip) {
            // Message({
            //     type: 'error',
            //     message: data.msg || '系统异常'
            // });
        }

        return Promise.reject(data);
    }
}, (err) => {
    var message = '系统异常';
    var msg = err.message || '';
    if (msg.indexOf('Network') > -1) {
        message = '网络异常';
    }

    // Message({
    //     type: 'error',
    //     message: message
    // });

  return Promise.reject(err);
});

/**
 * 发送get请求
 * @param  {string} url     请求地址
 * @param  {Object} data    发送的数据
 * @return {Promise}
 */
export function get (url, data = {}) {
    return axios.get(url, {
        params: data
    });
}

/**
 * 发送post请求
 * @param  {string} url     请求地址
 * @param  {Object} data    发送的数据
 * @return {Promise}
 */
export function post (url, data = {}, hideErr) {
    showErrTip = !hideErr;
    return axios.post(url, querystring.stringify(data), {timeout:2592000000});
}

export function postWithJson (url, data = {}, hideErr) {
    showErrTip = !hideErr;
    return axios.post(url, data);
}

/**
 * 发送delete请求
 * @param  {string} url     请求地址
 * @param  {Object} data    发送的数据
 * @return {Promise}
 */
export function del (url, data = {}) {
    return axios.delete(url, {
        params: data
    });
}

/**
 * 发送put请求
 * @param  {string} url     请求地址
 * @param  {Object} data    发送的数据
 * @return {Promise}
 */
export function put (url, data = {}) {
    return axios.put(url, data);
}
