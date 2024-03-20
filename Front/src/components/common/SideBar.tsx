import styled from "styled-components";
import bell from '../../assets/bell.png';
import home from '../../assets/home.png';
import logout from '../../assets/logout.png';
import microphone from '../../assets/microphone.png';
import record from '../../assets/musicRecord.png';
import question from '../../assets/questions.png';
import menu from '../../assets/menu.png';
import user from '../../assets/user.png';
import voice from '../../assets/voice.png';
import bgLogo from '../../assets/sideBgLogo.png';
import foldBtn from '../../assets/foldBtn.png';
import { Line } from "./Line";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div<{$isOpen: boolean}>`
  height: 100vh;
  width: ${(props) => (props.$isOpen ? "314px" : "60px")};
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  justify-content: space-between;

  .content {
    width: ${(props) => (props.$isOpen ? "85%" : "80%")};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .col {
      width: 100%;
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    p {
      padding-top: 0.4rem;
      color: white;
      font-size: 1.125rem;
    }
  }
`

function SideBar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(pre => !pre);
  };

  return (
    <Container $isOpen={isOpen}>
      {
        isOpen ?
        <>
          <div className="content">
            <div className="flex gap-2 justify-center items-center w-4/5">
              <img onClick={() => navigate('/')} src={bgLogo} alt="bgLogo" />
              <img onClick={toggleSideBar} src={foldBtn} alt="foldBtn" />
            </div>
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center w-full">
              <div onClick={() => navigate('/model/create')} className="col">
                <img src={microphone} alt="learning" />
                <p>음성 학습</p>
              </div>
              <div className="col">
                <img src={voice} alt="dubbing" />
                <p>더빙 학원</p>
              </div>
              <div className="col">
                <img src={record} alt="aicover" />
                <p>AI 커버</p>
              </div>
              <div className="col" onClick={() => navigate('/FAQ')}>
                <img src={question} alt="inquiry" />
                <p>FAQ</p>
              </div>
            </div>
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="col">
                <img src={user} alt="profile" />
                <p>마이페이지</p>
              </div>
              <div className="col">
                <img src={bell} alt="alarm" />
                <p>알림</p>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="flex flex-col gap-2 items-center w-full">
              <div className="col">
                <img src={logout} alt="logout" />
                <p>로그아웃</p>
              </div>
              <div className="col" onClick={() => navigate('/')}>
                <img src={home} alt="home" />
                <p>Home</p>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className="content">
            <img onClick={toggleSideBar} src={menu} alt="menu" />
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center">
              <img onClick={() => navigate('/model/create')} src={microphone} alt="learning" />
              <img src={voice} alt="dubbing" />
              <img src={record} alt="aicover" />
              <img onClick={() => navigate('/FAQ')} src={question} alt="inquiry" />
            </div>
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center">
              <img src={user} alt="profile" />
              <img src={bell} alt="alarm" />
            </div>
          </div>
          <div className="content">
            <div className="flex flex-col gap-2 items-center">
              <img src={logout} alt="logout" />
              <img onClick={() => navigate('/')} src={home} alt="home" />
            </div>
          </div>
        </>
      }
    </Container>
  )
}

export default SideBar;