import axios from 'axios';
import { getCookie, removeCookie, setCookie } from './cookie';
import { logout } from '../stores/user';

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
export const isProduction = env === "production";
export const HOST = isProduction ? import.meta.env.VITE_API_URL : "http://localhost";
export const PORT = ":8000/api";

// 백엔드 서버 기본 url 지정
export const URL = isProduction ?  HOST : HOST+PORT;

// axios instance 생성
const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const reissueAPI = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// 요청 인터셉터(인증 헤더 넣기)
API.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 응답 인터셉터(토큰 만료 처리)
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      const refreshToken = getCookie('refreshToken');
      const headers = { Authorization: refreshToken };
      return reissueAPI
        .get('/oauth/reissue', { headers })
        .then((res) => {
          const access = res.data.accessToken;
          const refresh = res.data.refreshToken;
          setCookie('accessToken', `Bearer ${access}`, { path: '/' });
          setCookie('refreshToken', `Bearer ${refresh}`, { path: '/' });
          // token 재발급 요청 이전에 행한(실패한) 요청을 재실행
          const originalRequest = err.config;
          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          return API(originalRequest);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            // refresh 토큰도 만료된 경우 -> 재로그인 필요
            handleLogout();
          }
          return err;
        });
    }
    return Promise.reject(err);
  },
);

function handleLogout() {
  logout();
  removeCookie('accessToken');
  removeCookie('refreshToken');
  window.location.href = '/landing';
}

export default API;
