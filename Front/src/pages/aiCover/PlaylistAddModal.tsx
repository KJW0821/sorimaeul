import styled from 'styled-components';
import { useEffect, useState } from "react";
import { Content } from "../../components/common/ModalStyles";
import { addCoverToList, getPlaylists } from "../../utils/playlistAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setPlaylists } from '../../stores/playlists';
import { closeModal } from '../../stores/modal';
import PlaylistSelect from '../../components/common/playlist/modal/PlaylistSelect';

const ScrollableList = styled.div`
  overflow-y: auto;
  max-height: 200px; // 이 값은 필요에 따라 조정하세요.
`;

const PlaylistItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color:  #e0e0e0;
  }
`;

export const CloseButton = styled.div`
  width: 1.5rem;
  height: 1.5em;
  border-radius: 50%;
  background: #000000;
  color: #FDA06C;
  display: flex;
  justify-content: center;
  align-items: center;
`

function PlaylistAddModal () {
  const dispatch = useDispatch();

  return (
    <>
    <Content $width={30} $height={20} $borderRadius={10}>
    <CloseButton color="#FDA06C" onClick={() => dispatch(closeModal())}>x</CloseButton>
      <h2>플레이리스트를 선택해주세요.</h2>
      <PlaylistSelect />
    </Content>
    </>
  )
}
export default PlaylistAddModal;