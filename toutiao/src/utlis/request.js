import axios from 'axios';
import router from '@/router';
const req = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0'
});
// 请求拦截 interceptors：拦截器
// 每次请求携带token
req.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// 响应拦截
req.interceptors.response.use(res => {
  return res;
}, err => {
  // 应该是401才对
  if (err.response.status === 401) {
    router.push('/login');
  }
  return Promise.reject(err); // 把err送到catch中
});

// 编辑用户个人资料
export default req;

