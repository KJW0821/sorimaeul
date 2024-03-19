import axios from "axios";
import { getCookie } from "./cookie";

// 백엔드 서버 기본 url 지정
export const URL = "http://localhost:8000/api";

const API = axios.create({
    baseURL: URL,
    withCredentials: true, 
    headers: {
        accessToken: await getCookie("accessToken"),
    },
})
  
export default API;

