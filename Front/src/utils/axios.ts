import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../stores/user";

// 백엔드 서버 기본 url 지정
export const URL = "http://localhost:8000/api";

const navigate = useNavigate();
const dispatch = useDispatch();
// axios instance 생성 
const API = axios.create({
    baseURL: URL,
    withCredentials: true, 
});

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
                dispatch(logout());
                removeCookie("accessToken");
                removeCookie("refreshToken");
                navigate("/");
            })
        }
    }
    return Promise.reject(err);
});

export default API;

