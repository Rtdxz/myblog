import axios from 'axios'



export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  });
  instance.interceptors.request.use(config => config, err => err);
  instance.interceptors.response.use(res => res, err => err);

  return instance(config);
}