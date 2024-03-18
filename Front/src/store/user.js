import API from "../utils/axios"

const kakaoLogin = (code) => {
    return function (dispatch, getState, { history }) {
        API.get(`api/oauth/login/${provider}?code=${code}`)
        .then((res) => {
            console.log(res);

            const ACCESS_TOKEN = res.data.accessToken;
            const REFRESH_TOKEN = res.data.refreshToken;

            localStorage.setItem("token", ACCESS_TOKEN); 

            history.replace("http://localhost:5173");

        })
        .catch((err) => {
            console.log(err, "소셜 로그인 에러");
            window.alert("로그인 실패");
            history.replace("http://localhost:5173");
        })
    }
}