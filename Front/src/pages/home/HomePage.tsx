import React from "react";
import { logout } from "../../utils/userAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../../stores/user";

// 메인페이지
const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    .then(() => {
      dispatch(set({ loggedIn: false }));
      console.log("로그아웃 성공");
      navigate("/");
    })
    .catch((err) => {
      console.error("로그아웃 실패;", err);
    })
  }

  return (
    <>
      <h1>HomePage</h1>
      <button onClick={ handleLogout }>Logout</button>
    </>
  );
}
export default HomePage;