import API from "./axios";
import { getCookie, removeCookie } from "./cookie";

export const checkLogin = () => {
  const access = getCookie("accessToken");
  const refresh = getCookie("refreshToken");
  let isUserLoggedIn = false;
  if (access && refresh) {
    isUserLoggedIn = true
  }
  return isUserLoggedIn;
}

export const checkNickname = (nickname: string) => {
  return API.get(`user/nickname/${nickname}`)
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
}

export const signUp = (nickname: string, profileImage: string) => {
  try {
    return API.post("user/signup", { nickname, profileImage });
  } catch (err) {
    console.error("회원 가입 실패", err);
  }
}

export const logout = () => {
  const access = getCookie("accessToken");
  const refresh = getCookie("refreshToken");
  const accessToken = access ? access.replace(/Bearer\s/, "") : undefined; // 접두사와 그 뒤의 공백 제거 -> base64 decoding error 해결
  const refreshToken = refresh ? refresh.replace(/Bearer\s/, "") : undefined;
  return API.get("oauth/logout", { params: { accessToken, refreshToken } })
    .then(() => {
      removeCookie("accessToken", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
    })
    .catch((err) => {
      console.log(err);
    })
}