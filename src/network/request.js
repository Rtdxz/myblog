import axios from 'axios'



export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    //  baseURL: 'http://8.142.27.247:3000',
  });
  instance.interceptors.request.use(config => {
    if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${localStorage.token}`;//一定要Bearer开头，不然后台无法验证
      // console.log(localStorage.token)
    }
    return config
  }, err => err);
  // instance.interceptors.response.use(res => res, err => err);

  return instance(config);
}