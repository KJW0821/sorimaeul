import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../stores/modal';
import { removePlaylist, setSelectedPlaylist, updatePlaylistName } from '../../../stores/playlists';
import { Button } from '../../common/Button';
import { deletePlaylist, updatePlaylist } from '../../../utils/playlistAPI';

const CardContainer = styled.div`
  width: 20rem;
  height: 20rem;
  cursor: pointer; /* 추가: 커서 스타일 변경 */
`;

// input 스타일 컴포넌트 추가
const StyledInput = styled.input`
  border: 1px solid #ccc; /* border 설정 */
  padding: 8px; /* padding 설정 */
  width: calc(100% - 16px); /* 전체 너비에서 padding 고려 */
  margin-bottom: 10px; /* input과 버튼 사이의 간격 설정 */
`;

interface Props {
  playlistCode: string,
  playlistName: string,
  createTime: string,
}

export const PlaylistCard: React.FC<Props> = ({ playlistCode, playlistName, createTime }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(playlistName);

  const openPlaylistDetailModal = (playlistCode: string) => {
    if (!isEditing) { // 수정 모드가 아닐 때만 모달을 열도록 조건 추가
      dispatch(setSelectedPlaylist({
        playlistCode: playlistCode,
        playlistName: playlistName,
        createTime: createTime
      }));
      dispatch(openModal({
        modalType: "playlistdetail",
        payload: { playlistCode: playlistCode }
      }));
    }
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

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (isEditing) {
      // 수정 모드이면, 변경된 이름으로 업데이트 요청
      updatePlaylist(playlistCode, {playlistName: editedName})
        .then(() => {
          setIsEditing(false); // 수정 모드 종료
          dispatch(updatePlaylistName({playlistCode, playlistName: editedName}));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setIsEditing(true); // 수정 모드 시작
    }
  };

  return (
    <CardContainer onClick={() => openPlaylistDetailModal(playlistCode)}>
      <img src={"/src/assets/playlist.png"} alt='플레이리스트 고정 이미지' />
      {isEditing ? (
        <StyledInput
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      ) : (
        <p>{playlistName}</p>
      )}
      <p>{createTime}</p>
      <Button onClick={handleDelete} disabled={isEditing}>  
        삭제
      </Button>

      <Button onClick={handleEdit}>
        {isEditing ? '저장' : '수정'}
      </Button>
    </CardContainer>
  )
}