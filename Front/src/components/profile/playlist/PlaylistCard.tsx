import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../stores/modal';
import { removePlaylist, setSelectedPlaylist } from '../../../stores/playlists';
import { Button } from '../../common/Button';
import { deletePlaylist } from '../../../utils/playlistAPI';

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

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    deletePlaylist(playlistCode)
      .then(() => {
        dispatch(removePlaylist(playlistCode));
        console.log(`${playlistName} 삭제 성공`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 
    console.log(`${playlistName} 수정하기`);
  };
  
  return (
    <CardContainer onClick={() => openPlaylistDetailModal(playlistCode)}>
      <img src={"/src/assets/playlist.png"} alt='플레이리스트 고정 이미지' />
      <p>{playlistName}</p>
      <p>{createTime}</p>
      <Button onClick={handleDelete}>
        삭제
      </Button >

      <Button  onClick={handleUpdate}>
        수정
      </Button>

    </CardContainer>

  )
}