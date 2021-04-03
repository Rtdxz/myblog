import axios from 'axios'



export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',

  });
  // instance.interceptors.request.use(config => config, err => err);
  // instance.interceptors.response.use(res => res, err => err);

  return instance(config);
}