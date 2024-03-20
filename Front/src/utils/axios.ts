import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";
import { logout } from "../stores/user";

// 백엔드 서버 기본 url 지정
export const URL = "http://localhost:8000/api";

// axios instance 생성 
const API = axios.create({
    baseURL: URL,
    withCredentials: true, 
});

// 요청 인터셉터(인증 헤더 넣기)
API.interceptors.request.use(config => {
    // 토큰이 필요 없는 URL 목록
    const urlsWithoutToken: (string | undefined)[] = []; 
    // 현재 요청 URL이 토큰이 필요없는 목록에 있는지 확인 
    const requiresToken = !urlsWithoutToken.includes(config.url);

    const accessToken = getCookie("accessToken");
    if (accessToken && requiresToken)  {
        config.headers["Authorization"] = accessToken;
    }
    return config;
}, err => {
    return Promise.reject(err);
})

// 응답 인터셉터(토큰 만료 처리)
API.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response && err.response.status === 401) {
        if (err.response.data.message === "JWT token expired") {
            console.log('Access 토큰 만료');
            const refreshToken = getCookie("refreshToken");
            const headers = { Authorization: refreshToken };
            API.get("/oauth/reissue", { headers })
            .then((res) => {
                const access = res.data.accessToken;
                setCookie("accessToken", `Bearer ${access}`, { path: "/"});
                // token 재발급 요청 이전에 행한(실패한) 요청을 재실행
                const originalRequest = err.config;
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return API(originalRequest);
            })
            .catch((err) => {
                // refresh 토큰도 만료된 경우 -> 재로그인 필요 
                handleLogout();
                console.log(err);
            })
        }
    }
    return Promise.reject(err);
});

function handleLogout() {
    logout();
    removeCookie("accessToken");
    removeCookie("refreshToken");
    window.location.href = "/";
}

export default API;

