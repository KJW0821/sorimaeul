import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import API from "../../utils/axios";


// 소셜 로그인 후 redirect될 페이지 (call back)
// 서버로부터 token(access, refresh)까지 받는 역할
const LoginCallbackPage: React.FC = () => {
    const provider:string = useLocation().pathname.slice(16);
    const code:string | null = new URLSearchParams(useLocation().search).get("code");

    if (code) {
        useEffect(() => {API.get(`api/oauth/login/${provider}?code=${code}`)
        .then((res) => {
            console.log(res.data);

        })
        .catch((err) => {
            console.log(err);

        });
    });
    
        return (
            <div className="LoginCallbackPage">
                <p>로그인 중</p>
            </div>
        );
    }

};

export default LoginCallbackPage;