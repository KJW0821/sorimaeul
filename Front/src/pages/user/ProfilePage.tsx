import { useSelector } from "react-redux";
import MenuBar from "../../components/profile/MenuBar";
import PlaylistBox from "../../components/profile/playlist/PlaylistBox";
import { RootState } from "../../stores/store";

function ProfilePage() {
  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);

  let ComponentToShow;
  switch (selectedMenu) {
    case "플레이리스트":
      ComponentToShow = PlaylistBox;
      break;
  }
  
  return (
    <>
    <h2>Profile Page</h2>
    <MenuBar />
    {ComponentToShow && <ComponentToShow />}
    </>
  )
}

export default ProfilePage;