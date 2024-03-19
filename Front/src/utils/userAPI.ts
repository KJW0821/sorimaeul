import API from "./axios";
import { getCookie } from "./cookie";

const accessToken = getCookie("accessToken");
const headers = { Authorization: accessToken };

export const checkNickname = ( nickname: string ) => {
  return API.get(`user/nickname/${nickname}`, { headers })
  .then((res) => {
    return res.data.result;
  })
  .catch((err) => {
    console.log("err", err);
    return err;
  });
}

export const signUp = async ( nickname: string, profileImage: string ) => {
  try {
    const res = await API.post('user/signup', { nickname, profileImage }, { headers });
    console.log("회원 가입 성공", res.data);
  } catch (err) {
    console.error("회원 가입 실패", err);
  }
}