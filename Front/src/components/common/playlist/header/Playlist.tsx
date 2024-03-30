import styled from 'styled-components';
import playlists from "../../../../assets/playlistCheck.png";
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../stores/modal';

const PlaylistComponent = styled.div`
  box-sizing: border-box;
  border: 1px dashed #000000;
  border-radius: 50px;
  padding: 20px; 
  margin: 20px; 
  margin-left: auto;
  width: 450px; 
  height: 55px; 
  right: 0;

  .list-icon {
    margin-bottom: 10px;
  }
`;


const Playlist: React.FC = () => {
  const dispatch = useDispatch();

  const openPlaylistHeaderModal = () => {
    dispatch(openModal({
      modalType: "playlistheader",
    }));
  };

  // 더미 데이터
  // const songs = [
  //   { title: "노래 제목 1", artist: "가수명 1" },

  // ];

  return (
    <PlaylistComponent>
      <img className="list-icon" onClick={openPlaylistHeaderModal} src={playlists} alt="Show Playlists Icon" />
      {/* {songs.map((song, index) => (
        <div key={index}>
          <strong>{song.title}</strong> - {song.artist}
        </div>
      ))} */}
    </PlaylistComponent>
  );
};

export default Playlist;