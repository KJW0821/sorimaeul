import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import API from "../../utils/axios";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";




// 소셜 로그인 후 redirect될 페이지 (call back)
// 서버로부터 token(access, refresh)까지 받는 역할
const LoginCallbackPage: React.FC = () => {
    const [status, setStatus] = useState<number | null>(null);
    const provider:string = useLocation().pathname.slice(16);
    const code:string | null = new URLSearchParams(useLocation().search).get("code");

    if (code) {
        useEffect(() => {API.get(`/oauth/login/${provider}?code=${code}`)
        .then((res) => {
            const token = res.data.accessToken;
            // if (getCookie("accessToken")) {
            //     removeCookie("accessToken");
            // }
            
            // 쿠키 설정 및 생성 - 보안 설정 수정 필요
            setCookie("accessToken",`Bearer ${token}`, {
                secure: false,  // 추후 true로 바꿔 Https 연결로만 전송 가능하게 하기 + sameSite: Strict 설정
                httpOnly: false, // XSS 공격 방지 - JS로 쿠키 접근 x 
                sameSite: 'none'
            });

            // 로그인 
            useEffect(() => {
                if (token) {
                  API.get("/user/login", {
                    headers: {
                      Authorization: token
                    }
                  })
                  .then((res) => {
                    setStatus(res.status);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                } else {
                  console.log("토큰이 없습니다.");
                }
              }, [token]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [code, provider]);


    
    
        return (
            <div>
                {status === 200 && <Navigate to={"/home"} />}
                {status === 204 && <Navigate to={"/signup"} />}
            </div>
        );
    }

};

export default LoginCallbackPage;