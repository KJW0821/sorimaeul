import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Playlist from "./playlist/header/Playlist";
import logoimage from '../../assets/logo.png';

interface HeaderProps {
  $isMainPage: boolean;
}

const HeaderContainer = styled.div<HeaderProps>`
  display: flex;
  flex-direction: ${props => props.$isMainPage ? "column" : "row"};
  justify-content: ${props => props.$isMainPage ? "space-between" : "center"};
  align-items: center;
  padding: 20px;
`;

interface LogoProps {
  $isMainPage: boolean;
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img<LogoProps>`
  width: ${props => props.$isMainPage ? '800px' : '300px'}; // 메인 페이지 여부에 따른 너비 설정
  height: auto; // 높이는 자동으로 조절
`;


const Header: React.FC<{ mainPage?: boolean }> = ({ mainPage }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/"; // 메인 페이지의 경로가 '/'인 경우
  return (
    <HeaderContainer $isMainPage={isMainPage}>
      {isMainPage ? (
        <>
          <Playlist />
          <Link to="/">
            <Logo src={logoimage} $isMainPage={isMainPage}></Logo>
          </Link>
        </>
      ) : (
        <>
          <LogoContainer>
            <Link to="/">
              <Logo src={logoimage} $isMainPage={isMainPage}></Logo>
            </Link>
          </LogoContainer>
          <Playlist />
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;
