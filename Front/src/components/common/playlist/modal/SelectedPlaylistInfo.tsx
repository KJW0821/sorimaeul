import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import DetailPlayer from "../../../audioPlayer/DetailPlayer";
import deleteIcon from "../../../../assets/deleteIcon.png";
import { styled } from "styled-components";
import { deleteCoverFromList, getPlaylist } from "../../../../utils/playlistAPI";
import { useEffect, useState } from "react";
import { PlaylistDetailInterface } from "../../../profile/playlist/PlaylistDetailModal";
import { setSelectedPlaylist } from "../../../../stores/playlists";

const PlaylistItem = styled.li`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border: 3px solid #cccccc; 
  border-radius: 10px;
  overflow-y: hidden;
  margin: 7px;
  
  background-color: white;
  padding: 0.25rem;

  &:hover {
    background-color: #f0f0f0; 
  }

  &:active {
    background-color: #e0e0e0;
  }
`;

const CoverItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  margin-top: 0.25rem;

  span:first-child {
    flex: 1; // 커버명과 가수명이 더 많은 공간을 차지하도록 설정
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function SelectedPlaylistInfo() {
  const selectedPlaylist = useSelector((state: RootState) => state.playlists.selectedPlaylist);
  const baseURL = "https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com";
  const [data, setData] = useState<PlaylistDetailInterface | null>(null);
  const playlistCode = selectedPlaylist?.playlistCode;


  useEffect(() => {

    if (playlistCode) {
      (async () => {
        try {
          const data = await getPlaylist(playlistCode);
          setData(data);
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [selectedPlaylist]);

  // 플레이리스트에서 커버 삭제
  const deletCoverFromPlaylist = async (coverCode: string) => {
    if (!playlistCode) return;

    const res = await deleteCoverFromList(playlistCode, coverCode);
    if (res.status == 200) {
      console.log("삭제 성공!");
      const updateData = await getPlaylist(playlistCode);
      setData(updateData);
      setSelectedPlaylist(updateData);
    }
  }

  // selectedPlaylist가 정의되지 않았을 경우를 대비한 처리
  if (!selectedPlaylist || !selectedPlaylist.covers) {
    return <div>선택된 플레이리스트가 없습니다.</div>;
  }

  return (
    <div>
      <h2>플레이리스트 커버 목록</h2>
      <ul>
        {selectedPlaylist.covers.map((cover, index) => (
          <PlaylistItem key={index}>
            <CoverItem>
            <span>{cover.title} - {cover.singer} ({cover.coverSinger}) {cover.isPublic}</span>
            {cover.nickname} <DetailPlayer isPublic={cover.isPublic} coverCode={cover.coverCode} src={`${baseURL}/${cover.storagePath}`}></DetailPlayer>
            <img src={deleteIcon} className="mt-3" onClick={() => deletCoverFromPlaylist(cover.coverCode)} />
            </CoverItem>
            <span></span>
          </PlaylistItem>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPlaylistInfo;