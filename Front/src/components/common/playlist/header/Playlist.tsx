import styled from 'styled-components';
import playlists from "../../../../assets/playlistCheck.png";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../stores/modal';
import { RootState } from '../../../../stores/store';
import HeaderPlayer from '../../../audioPlayer/HeaderPlayer';

const PlaylistComponent = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px dashed #000000;
  border-radius: 50px;
  padding: 1rem; 
  margin: 20px; 
  margin-left: auto;
  width: 600px; 
  height: 55px; 
  right: 0;

  .list-icon {
    width: 10%;
    height: 100%;
  }
`;

const HeaderPlayerContainer = styled.div`
  width: 88%;
  margin-left: auto;
`;


const Playlist: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector((state: RootState) => state.playlists.selectedPlaylist);

  const openPlaylistHeaderModal = () => {
    dispatch(openModal({
      modalType: "playlistheader",
    }));
  };

  return (
    <PlaylistComponent>
      <img className="list-icon" onClick={openPlaylistHeaderModal} src={playlists} alt="Show Playlists Icon" />
      <HeaderPlayerContainer>
        <HeaderPlayer/>
      </HeaderPlayerContainer>
    </PlaylistComponent>
  );
};

export default Playlist;