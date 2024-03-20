const LandingPage: React.FC = () => {
  // kakao - axios 통신을 하면 CORS 에러 발생 
  // 소셜로그인 페이지로 이동하는 요청을 href 링크에 담았다 
  const handleSocialLogin = (provider: string) => {
    let url = `http://localhost:8000/api/oauth/code/${provider}`;
    window.location.href = url;

  };

  return (
    <>  
        <div>
            <button onClick={() => handleSocialLogin('kakao')}>카카오 로그인</button>
        </div>
        <div>
            <button onClick={() => handleSocialLogin('google')}>구글 로그인</button>
        </div>
    </>
  );
};

export default LandingPage;