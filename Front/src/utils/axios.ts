import axios from "axios";
import { getCookie } from "./cookie";

// 백엔드 서버 기본 url 지정
export const URL = "http://localhost:8000/api";

const API = axios.create({
    baseURL: URL,
    withCredentials: true,
});

// 요청 인터셉터 추가
API.interceptors.request.use(async (config) => {
    // accessToken을 쿠키에서 비동기적으로 가져옴
    const accessToken = await getCookie("accessToken");
    if (accessToken) {
        config.headers['accessToken'] = accessToken;  // 헤더에 accessToken 추가
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;

