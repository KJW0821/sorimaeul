import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPlaylists } from "../../../../stores/playlists";
import { RootState } from "../../../../stores/store";
import { addCoverToList, getPlaylists } from "../../../../utils/playlistAPI";
import { closeModal } from "../../../../stores/modal";

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

function PlaylistSelect () {
  const dispatch = useDispatch();
  let dataList = useSelector((state: RootState) => state.playlists.playlists);
  const coverCode = useSelector((state: RootState) => state.modal.payload.coverCode);
  const [page, setPages] = useState(1);
  const [covers, setCovers] = useState(dataList);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists(page);
        console.log("플리 조회 목록", data);
        setPlaylists(data.playlists);
        setCovers(data.playlists);
      } catch (err) {
        console.error("플레이리스트 데이터를 가져오는데 실패했습니다.")
      }
  }) ();
}, [dispatch]);

const addCoverToPlaylist = async (playlistCode: string) => {
  const res = await addCoverToList(playlistCode, coverCode);
  if (res.status === 201) {
    console.log(res);
    alert(res.data);
    dispatch(closeModal());
  } else { 
      alert(res.response.data);
  }}

  console.log(covers);

  return (
    <>
      <ScrollableList>
          {covers && covers.map((playlist) => (
            <PlaylistItem key={playlist.playlistCode} className="border-b border-gray-200"
            onClick={() => addCoverToPlaylist(playlist.playlistCode)}>
              
              {playlist.playlistName} {playlist.createTime}
            </PlaylistItem>
          ))}
        </ScrollableList>
    </>
  );
}

export default PlaylistSelect;