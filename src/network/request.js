import axios from 'axios'
import { Message } from 'element-ui'


export function request(config) {
  const instance = axios.create({
    //baseURL: 'http://localhost:3000',
    baseURL: 'http://8.142.27.247:3000',
  });
  instance.interceptors.request.use(config => {
    if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${localStorage.token}`;//一定要Bearer开头，不然后台无法验证
      // console.log(localStorage.token)
    }
    return config
  }, err => Promise.reject(err));
  instance.interceptors.response.use(res => res, err => {// 当响应异常时做一些处理

    if (err && err.response) {
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)'; break;

        case 401: err.message = '未授权，请重新登录(401)'; break;

        case 403: err.message = '拒绝访问(403)'; break;

        case 404: err.message = '请求出错(404)'; break;

        case 408: err.message = '请求超时(408)'; break;

        case 500: err.message = '服务器错误(500)'; break;

        case 501: err.message = '服务未实现(501)'; break;

        case 502: err.message = '网络错误(502)'; break;

        case 503: err.message = '服务不可用(503)'; break;

        case 504: err.message = '网络超时(504)'; break;

        case 505: err.message = 'HTTP版本不受支持(505)'; break;

        default: err.message = `连接出错(${err.response.status})!`;

      }

    } else {
      err.message = '连接服务器失败!'

    }

    Message.error(err.message);

    return Promise.resolve(err);
  })

  return instance(config);
}