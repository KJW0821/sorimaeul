import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import DetailPlayer from "../../../audioPlayer/DetailPlayer";
import deleteIcon from "../../../assets/deleteIcon.png";

function SelectedPlaylistInfo () {
  const selectedPlaylist =  useSelector((state: RootState) => state.playlists.selectedPlaylist);
  const baseURL = "https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com";
  console.log(selectedPlaylist);

  // selectedPlaylist가 정의되지 않았을 경우를 대비한 처리
  if (!selectedPlaylist || !selectedPlaylist.covers) {
    return <div>선택된 플레이리스트가 없습니다.</div>;
  }

  return (
    <div>
      <h2>플레이리스트 커버 목록</h2>
      <ul>
        {selectedPlaylist.covers.map((cover, index) => (
          <li key={index}>
            {/* 커버의 상세 정보를 표시. 예시로 cover.title을 사용했습니다. 실제 속성명에 맞게 조정해주세요. */}
             <span>{cover.title} - {cover.singer} ({cover.coverSinger}) {cover.isPublic}</span>
             <span>{cover.nickname} <DetailPlayer isPublic={cover.isPublic} coverCode={cover.coverCode} src={`${baseURL}/${cover.storagePath}`}></DetailPlayer></span>
             
             <span></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPlaylistInfo;