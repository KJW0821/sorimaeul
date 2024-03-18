import axios from "axios";

// 백엔드 서버 기본 url 지정
export const URL = "http://localhost:8000";

const API = axios.create({
    baseURL: URL,
    // withCredentials: true, 자격 증명
})

  
  export default API;