import API from "./axios";
import { getCookie, removeCookie } from "./cookie";

const access = getCookie("accessToken");
const refresh = getCookie("refreshToken");
const accessToken = access ? access.replace(/Bearer\s/, "") : undefined; // 접두사와 그 뒤의 공백 제거 -> base64 decoding error 해결
const refreshToken = refresh ? refresh .replace(/Bearer\s/, "") : undefined; 

export const checkNickname = ( nickname: string ) => {
  return API.get(`user/nickname/${nickname}`)
  .then((res) => {
    return res.data.result;
  })
  .catch((err) => {
    return err;
  });
}

export const signUp = async ( nickname: string, profileImage: string ) => {
  try {
    const res = await API.post("user/signup", { nickname, profileImage });
    console.log("회원 가입 성공", res.data);
  } catch (err) {
    console.error("회원 가입 실패", err);
  }
}

export const logout = () => {
  return API.get("oauth/logout", { params: { accessToken, refreshToken } })
  .then(() => {
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
  })
  .catch((err) => {
    console.error("로그아웃 중 오류 발생", err);
  })
}