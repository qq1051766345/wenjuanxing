import { message } from 'antd';
import axios from 'axios';
import { getToken } from '../utils/user-token';

const instance = axios.create({
  timeout: 1000 * 60,
});

// request 拦截器，每次请求都需要带上token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`; // JWT的固定格式
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// response拦截器:统一处理，errno 和msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) message.error(msg);
    throw new Error(msg);
  }
  return data as any;
});

export default instance;
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
