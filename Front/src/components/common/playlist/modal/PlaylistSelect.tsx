import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPlaylists } from "../../../../stores/playlists";
import { RootState } from "../../../../stores/store";
import { getPlaylists } from "../../../../utils/playlistAPI";
import dropBtn from "../../../../assets/dropBtn.png";

const PlaylistMenuBox = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0.3rem;
  border: 1px solid black;
  border-radius: 5px;
  color:white;
  background-color: black;
  img{
    width: 30px;
    height: 34px;
  }
`;

const ScrollableList = styled.div`
  overflow-y: auto;
  max-height: 200px; 
  background: white;
  border-radius: 5px;
`;

const PlaylistItem = styled.div`
  display: flex;
  justify-content: space-between; // 항목을 양 끝으로 정렬
  align-items: center;
  border-bottom: 1px solid #cccccc; // border-gray-200 대신 사용
  padding: 10px;
`;

const PlaylistDate = styled.span`
  margin-top: 5px;
  font-size:15px;
  color: #808080; // 글자 색 회색으로 설정
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
`;

// 날짜 형식을 변경하는 함수
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\. /g, '.');
}

interface PlaylistSelectProps {
  onPlaylistSelect: (playlistCode: string) => void;
}

const PlaylistSelect: React.FC<PlaylistSelectProps> = ({ onPlaylistSelect }) => {
  const dispatch = useDispatch();
  let dataList = useSelector((state: RootState) => state.playlists.playlists);
  const selectedPlaylistName = useSelector((state: RootState) => state.playlists.selectedPlaylist?.playlistName);
  const [covers, setCovers] = useState(dataList);
  const [isOpen, setIsOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState<string>(selectedPlaylistName ?? "플레이리스트 선택");
  const onToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists();
        console.log("플리 조회 목록", data);
        console.log(data.playlists);
        dispatch(setPlaylists(data.playlists));
        setCovers(data.playlists);
      } catch (err) {
        console.error("플레이리스트 데이터를 가져오는데 실패했습니다.")
      }
    })();
  }, [dispatch]);

  const handelSelect = (playlistCode: string, playlistName: string) => {
    onPlaylistSelect(playlistCode);
    setPlaylistName(playlistName);
    setIsOpen(false);
  }

  return (
    <>
      <PlaylistMenuBox onClick={onToggle}>
      <img src={dropBtn} alt="dropdown playlist menu open" /> {playlistName || "플레이리스트 선택" } 
      </PlaylistMenuBox>
      {isOpen && (<ScrollableList>
         {covers && covers.map((playlist) => (
          <PlaylistItem key={playlist.playlistCode} className="border-b border-gray-200"
            onClick={() => handelSelect(playlist.playlistCode, playlist.playlistName)}>

            <span className="mt-2">{playlist.playlistName}</span>
            <PlaylistDate>
              {formatDate(playlist.createdTime)}
            </PlaylistDate>
          </PlaylistItem>
        ))}
      </ScrollableList>
  )}
    </>
  );
}


export default PlaylistSelect;