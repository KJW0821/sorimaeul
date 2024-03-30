import styled from 'styled-components';
import { useEffect } from "react";
import { CloseButton, Content } from "../../components/common/ModalStyles";
import { addCoverToList, getPlaylists } from "../../utils/playlistAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setPlaylists } from '../../stores/playlists';
import { closeModal } from '../../stores/modal';

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

const PlaylistAddModal : React.FC = () => {
  const dispatch = useDispatch();
  let dataList = useSelector((state: RootState) => state.playlists);
  const coverCode = useSelector((state: RootState) => state.modal.payload.coverCode);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
        if (!dataList) {
          dataList = data;
        }
      } catch (err) {
        console.error("플레이리스트 데이터를 가져오는데 실패했습니다.")
      }
  }) ();
}, []);

const addCoverToPlaylist = async (playlistCode: string) => {
    const res = await addCoverToList(playlistCode, coverCode);
    if (res.status === 201) {
      console.log(res);
      alert(res.data);
      dispatch(closeModal());
    } else { 
        alert(res.response.data);
    }

}


  return (
    <>
    <Content $width={30} $height={20} $borderRadius={10}>
    <CloseButton>x</CloseButton>
      <h2>플레이리스트를 선택해주세요.</h2>
      <ScrollableList>
          {dataList && dataList.playlists.map((playlist) => (
            <PlaylistItem key={playlist.playlistCode} className="border-b border-gray-200"
            onClick={() => addCoverToPlaylist(playlist.playlistCode)}>
              {playlist.playlistName} {playlist.createTime}
            </PlaylistItem>
          ))}
        </ScrollableList>
    </Content>
    </>
  )
}
export default PlaylistAddModal;