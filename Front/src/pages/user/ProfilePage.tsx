import { useSelector } from "react-redux";
import MenuBar from "../../components/profile/MenuBar";
import PlaylistBox from "../../components/profile/playlist/PlaylistBox";
import { RootState } from "../../stores/store";
import ColorLine from "../../components/profile/ColorLine";
import CoverBox from "../../components/profile/aiCover/CoverBox";
import { styled } from "styled-components";
import UserEditor from "../../components/profile/UserEditor";
import learnCnt from "../../assets/learnCnt.png";

const Container = styled.div`
  display: flex;
  width: 100%; 
`;

const MenuBarContainer = styled.div`
  flex: 0 0 20%; 
  padding-left: 150px;

  display: flex;
  flex-direction: column
`;

const ContentContainer = styled.div`
  flex: 0 0 80%; 
`;

const LearnCountContainer = styled.div`
  width: 191px;
  height: 32px;
  background: #C9F647;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  `;

const LearnCountText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #000000;
`;

function ProfilePage() {
  const learnCount = useSelector((state: RootState) => state.user.learnCount);
  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);


  let ComponentToShow;
  switch (selectedMenu) {
    case "AI 커버":
      ComponentToShow = CoverBox;
      break;
    case "플레이리스트":
      ComponentToShow = PlaylistBox;
      break;
  }

  return (
    <>
      <ColorLine />

      <Container>

        <MenuBarContainer>
          <UserEditor />
          <LearnCountContainer>
            <img src={learnCnt} className="" alt="Learn Count" />
            <LearnCountText>남은 모델 학습 횟수: {learnCount}회</LearnCountText>
          </LearnCountContainer>
          <MenuBar />
        </MenuBarContainer>

        <ContentContainer>
          {ComponentToShow && <ComponentToShow />}
        </ContentContainer>
      </Container>
    </>
  )
}

export default ProfilePage;