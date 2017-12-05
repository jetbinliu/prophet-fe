
'use strict';

import axios from 'axios';

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

     // 未登录状态
    if (code === 2000000500) {
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
    return axios.post(url, querystring.stringify(data));
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
