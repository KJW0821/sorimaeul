import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";

import API from "../../utils/axios";


const cookie = new Cookies();
// 소셜 로그인 후 redirect될 페이지 (call back)
// 서버로부터 token(access, refresh)까지 받는 역할
const LoginCallbackPage: React.FC = () => {
    const provider:string = useLocation().pathname.slice(16);
    const code:string | null = new URLSearchParams(useLocation().search).get("code");

    if (code) {
        useEffect(() => {API.get(`/oauth/login/${provider}?code=${code}`)
        .then((res) => {
            const token = res.data.accessToken;

            if (cookie.get("U_ID")) {
                cookie.remove("U_ID");
            }

            cookie.set("U_ID", `Bearer ${token}`, {
                path: '/',
                secure: false, // 추후 true로 바꿔 Https 연결로만 전송 가능하게 하기 + sameSite: Strict 설정
                httpOnly: true, // XSS 공격 방지 - JS로 쿠키 접근 x 

            });

            console.log(1 , cookie);
            console.log(2, cookie.get("U_ID"));

            // 로그인 함수 호출
            login();

        })
        .catch((err) => {
            console.log(err);

        });
    }, [code, provider, cookie]);

    const login = () => {
        const token = cookie.get("U_ID");
        console.log(3, token);

        if (token) {
            // 로그인 요청 보내기
            API.post('/user/login', {}, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    window.location.href = '/';
                } else if (res.status === 204) {

                } 
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            console.log("토큰이 없습니다.")
        }
    }
    
    
        return (
            <div className="LoginCallbackPage">
                <p>로그인 중</p>
            </div>
        );
    }

};

export default LoginCallbackPage;