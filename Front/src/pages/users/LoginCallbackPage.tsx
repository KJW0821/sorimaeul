import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import API from "../../utils/axios";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import { login } from "../../utils/loginAPI";



// 소셜 로그인 후 redirect될 페이지 (call back)
// 서버로부터 token(access, refresh)까지 받는 역할
const LoginCallbackPage: React.FC = () => {
    const provider:string = useLocation().pathname.slice(16);
    const code:string | null = new URLSearchParams(useLocation().search).get("code");

    if (code) {
        useEffect(() => {API.get(`/oauth/login/${provider}?code=${code}`)
        .then((res) => {
            const token = res.data.accessToken;
            
            // 쿠키 설정 및 생성 
            setCookie("accessToken",`Bearer ${token}`, {
                secure: false,  // 추후 true로 바꿔 Https 연결로만 전송 가능하게 하기 + sameSite: Strict 설정
                httpOnly: true, // XSS 공격 방지 - JS로 쿠키 접근 x 
            });

            // 로그인 함수 호출
            login();
        })
        .catch((err) => {
            console.log(err);
        });
    }, [code, provider]);


    
    
        return (
            <div className="LoginCallbackPage">
                <p>로그인 중</p>
            </div>
        );
    }

};

export default LoginCallbackPage;