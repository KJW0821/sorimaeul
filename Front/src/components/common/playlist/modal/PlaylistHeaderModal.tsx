import { LogoIcon, ModalHeader } from "../../../profile/playlist/PlaylistDetailModal";
import { Content } from "../../ModalStyles";
import logo from "../../../../assets/logoBig.png";
import { styled } from "styled-components";
import { closeModal } from "../../../../stores/modal";
import PlaylistSelect from "./PlaylistSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import { setSelectedPlaylist } from "../../../../stores/playlists";
import { getPlaylist } from "../../../../utils/playlistAPI";

export const CloseButton = styled.div`
  width: 36px;
  height: 34px;
  border-radius: 50%;
  background: #BFEA44;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const PlaylistHeaderModal: React.FC = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlists.playlists);
  const handlePlaylistSelect = async (playlistCode:string) => {
    try {
      // 플레이리스트 안 선택된 플레이리스트 정보 가져오기 
      const selectedPlaylist = playlists.find(playlist => playlist.playlistCode === playlistCode);
      // 선택된 플레이리스트의 커버 목록 가져오기 
      const playlistCovers = await getPlaylist(playlistCode);
      // 위의 정보 결합 
      if (selectedPlaylist) {
        const updatedPlaylist = {
          ...selectedPlaylist, 
          covers: playlistCovers
        };
      
      dispatch(setSelectedPlaylist(updatedPlaylist));
      }
    } catch (error) {
      console.error("플레이리스트 상세 정보를 가져오는 데 실패했습니다.", error);
    }
  };
  

  return (
    <>
    <Content $width={55} $height={55} $borderRadius={30} $background="black">
    <ModalHeader>
    <LogoIcon src={logo} alt="sorimaeul logo" />
    <p>플레이리스트</p>
    <CloseButton onClick={() => dispatch(closeModal())}>x</CloseButton>
    </ModalHeader>
    <PlaylistSelect onPlaylistSelect={handlePlaylistSelect}/>
    </Content>
    </>
  )
}

export default PlaylistHeaderModal;