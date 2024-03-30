import { useDispatch } from "react-redux";
import { openModal } from "../../../stores/modal";
import { Button } from "../../common/Button";
import { PlaylistList } from "./PlaylistList";
import MenuDescription from "../MenuDescription";
import { styled } from "styled-components";

// 간격 주는 용도
const Divider = styled.div`
  height: 30px; 
  width: 100%;
`;

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
      <Button onClick={openPlaylistCreateModal}
      $color="#BFEA44"
      $marginLeft={70} $marginTop={0}> + 새로 만들기</ Button> 
       <Divider></Divider>
      <PlaylistList />
    </div>
  )
}

export default PlaylistBox;