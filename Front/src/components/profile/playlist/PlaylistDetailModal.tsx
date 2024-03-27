import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useEffect, useState } from "react";
import { deleteCoverFromList, getPlaylist } from "../../../utils/playlistAPI";
import { CloseButton, Content } from "../../common/ModalStyles";



export interface CoverInfo {
  coverCode: string;
  coverSinger: string;
  singer: string;
  title: string;
  storagePath: string;
  nickname: string;
}

interface PlaylistDetailInterface {
  playlist: CoverInfo[];
}

function PlaylistDetailModal() {
  const { playlistCode, playlistName, createTime } = useSelector((state: RootState) => state.playlists.selectedPlaylist) ?? { playlistCode: '', playlistName: '', createTime: '' };
  const [data, setData] = useState<PlaylistDetailInterface | null>(null);

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
  }, [playlistCode]);

  const deletCoverFromPlaylist = async (coverCode: string) => {
    const res = await deleteCoverFromList(playlistCode, coverCode);
    if (res.status == 200) {
      console.log("삭제 성공!");
      const updateData = await getPlaylist(playlistCode);
      setData(updateData);
    }
  }

  return (
    <>
      <Content $width={40} $height={50} $borderRadius={30}>
        <CloseButton>x</CloseButton>
        <div>
          <p>플레이리스트 이름: {playlistName}</p>
          <span>커버명</span>
          <span>크리에이터</span>
          <span>총 곡수</span>
          <hr />
        </div>
        <div>
          <h2>AI 커버 목록</h2>
          <ul>
            {data?.playlist.map((cover, index) => (
              <li key={index}>
                <span>{cover.title}-{cover.singer}({cover.coverSinger})</span>
                <span>작성자명: {cover.nickname} </span>
                <button onClick={()=>deletCoverFromPlaylist(cover.coverCode)}>[삭제]</button>

              </li>
            ))}
          </ul>
        </div>
      </Content>
    </>
  )
}

export default PlaylistDetailModal;