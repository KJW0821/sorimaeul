import { Navigate, redirect } from "react-router-dom"
import API from "./axios"
import { getCookie } from "./cookie"

export const login = () => {
  const token = getCookie("accessToken")
  console.log(token)

  if (token) {
    // 로그인 요청 보내기 
    API.get("/user/login", {
      headers: {
        Authorization: token
      }
    })
    .then((res) => {
      const status: number = res.status;
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    console.log("토큰이 없습니다.");
  }

}     
