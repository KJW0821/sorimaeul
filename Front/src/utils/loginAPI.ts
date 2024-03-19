import API from "./axios"
import { getCookie } from "./cookie"

export const login = () => {
  const token = getCookie("accessToken")
  console.log(token)

  if (token) {
    // 로그인 요청 보내기 
    API.post("/user/login", {}, {
      headers: {
        Authorization: token
      }
    })
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = '/home';
      } else if (res.status === 204) {
        window.localStorage.href = '/signup'
      }
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    console.log("토큰이 없습니다.");
  }
}     
