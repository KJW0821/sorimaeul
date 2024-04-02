import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Playlist from './playlist/header/Playlist';
import logoimage from '../../assets/logo.png';

interface HeaderProps {
  $isMainPage: boolean;
}

const HeaderContainer = styled.div<HeaderProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMainPage ? 'row' : 'row')};
  justify-content: ${(props) => (props.$isMainPage ? 'center' : 'center')};
  align-items: center;
  width: 100%;
  height: 6.25rem;
`;

interface LogoProps {
  $isMainPage: boolean;
}

const LogoContainer = styled.div<LogoProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: ${(props) => (props.$isMainPage ? '300px' : '300px')};
  margin-top: ${(props) => (props.$isMainPage ? '0' : '0')};
`;

export const Logo = styled.img<LogoProps>`
  width: ${(props) => (props.$isMainPage ? '300px' : '300px')};
  height: auto;
`;

const Header: React.FC<{ mainPage?: boolean }> = ({ mainPage }) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/'; // 메인 페이지의 경로가 '/'인 경우
  return (
    <HeaderContainer $isMainPage={isMainPage}>
      {isMainPage ? (
        <></>
      ) : (
        <>
          <LogoContainer $isMainPage={isMainPage}>
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

//  {isMainPage ? (
//     <>
//       {/* <Playlist />
//       <Link to="/">
//         <Logo src={logoimage} $isMainPage={isMainPage}></Logo>
//       </Link> */}
//       <Playlist />
//     </>
//   ) : (
//     <>
//       <LogoContainer $isMainPage={isMainPage}>
//         <Link to="/">
//           <Logo src={logoimage} $isMainPage={isMainPage}></Logo>
//         </Link>
//       </LogoContainer>
//       <Playlist />
//     </>
//   )}
