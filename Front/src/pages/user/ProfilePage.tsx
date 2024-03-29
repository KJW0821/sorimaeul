import { useSelector } from "react-redux";
import MenuBar from "../../components/profile/MenuBar";
import PlaylistBox from "../../components/profile/playlist/PlaylistBox";
import { RootState } from "../../stores/store";
import ColorLine from "../../components/profile/ColorLine";
import CoverBox from "../../components/profile/aiCover/CoverBox";
import { styled } from "styled-components";
import UserEditor from "../../components/profile/UserEditor";

const Container = styled.div`
  display: flex;
  width: 100%; 
`;

const MenuBarContainer = styled.div`
  flex: 0 0 20%; 
  padding-left: 70px;
  padding-right: 70px;
  display: flex;
  flex-direction: column
`;

const ContentContainer = styled.div`
  flex: 0 0 80%; 
`;


const LearnCountContainer = styled.div``;

function ProfilePage() {
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
    <ColorLine/>

    <Container>
      
      <MenuBarContainer>
      <UserEditor />
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