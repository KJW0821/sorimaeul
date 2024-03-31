import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPlaylists } from "../../../../stores/playlists";
import { RootState } from "../../../../stores/store";
import { getPlaylists } from "../../../../utils/playlistAPI";

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
  const options: Intl.DateTimeFormatOptions  = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\. /g, '.');
}

interface PlaylistSelectProps {
  onPlaylistSelect: (playlistCode: string) => void;
}

const PlaylistSelect: React.FC<PlaylistSelectProps> = ({ onPlaylistSelect }) => {
  const dispatch = useDispatch();
  let dataList = useSelector((state: RootState) => state.playlists.playlists);
  const [covers, setCovers] = useState(dataList);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists();
        console.log("플리 조회 목록", data);
        setPlaylists(data);
        setCovers(data.playlists);
      } catch (err) {
        console.error("플레이리스트 데이터를 가져오는데 실패했습니다.")
      }
    })();
  }, [dispatch]);

  return (
    <>
      <ScrollableList>
          {covers && covers.map((playlist) => (
            <PlaylistItem key={playlist.playlistCode} className="border-b border-gray-200"
            onClick={() => onPlaylistSelect(playlist.playlistCode)}>
              
              <span className="mt-2">{playlist.playlistName}</span> 
              <PlaylistDate>
              {formatDate(playlist.createdTime)}
              </PlaylistDate>
            </PlaylistItem>
          ))}
        </ScrollableList>
    </>
  );
}


export default PlaylistSelect;