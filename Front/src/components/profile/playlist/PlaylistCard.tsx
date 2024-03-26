import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../stores/modal';
import { setSelectedPlaylist } from '../../../stores/playlists';

const CardContainer = styled.div`
  width: 20rem;
  height: 30rem;
`;

interface Props {
  playlistCode: string,
  playlistName: string,
  createTime: string,
}


export const PlaylistCard: React.FC<Props> = ({playlistCode, playlistName, createTime }) => {
  const dispatch = useDispatch();
  const openPlaylistDetailModal = (playlistCode: string) => {
    dispatch(setSelectedPlaylist({
      playlistCode: playlistCode,
      playlistName: playlistName,
      createTime: createTime
    }))
    dispatch(openModal({
      modalType: "playlistdetail",
      payload: { playlistCode: playlistCode }
    }));
  }
  
  return (
    <CardContainer onClick={() => openPlaylistDetailModal(playlistCode)}>
      <img src={"/src/assets/playlist.png"} alt='플레이리스트 고정 이미지' />
      <p>{playlistName}</p>
      <p>{createTime}</p>

    </CardContainer>

  )
}