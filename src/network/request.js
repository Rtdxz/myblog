import axios from 'axios'



export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',

  });
  instance.interceptors.request.use(config => {
    if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.token}`;//这个字符串里的token可以不写

    }
    return config
  }, err => err);
  // instance.interceptors.response.use(res => res, err => err);

  return instance(config);
}