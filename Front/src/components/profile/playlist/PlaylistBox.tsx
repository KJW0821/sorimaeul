import { useDispatch } from "react-redux";
import { openModal } from "../../../stores/modal";
import { Button } from "../../common/Button";
import { PlaylistList } from "./PlaylistList";
import MenuDescription from "../MenuDescription";

function PlaylistBox() {
  const dispatch = useDispatch();

  const openPlaylistCreateModal = () => {
    dispatch(openModal({
      modalType: "playlistcreate",
    }));
  };


  return (
    <div>
      <MenuDescription bigText={"플"} middleText={"레이리스트"} smallText={""} />
      <Button onClick={openPlaylistCreateModal} $marginLeft={0} $marginTop={0}> + 새로 만들기</ Button> 
      <PlaylistList />
    </div>
  )
}

export default PlaylistBox;