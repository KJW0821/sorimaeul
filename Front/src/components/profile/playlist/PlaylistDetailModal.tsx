import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useEffect, useState } from "react";
import { deleteCoverFromList, getPlaylist } from "../../../utils/playlistAPI";
import { Content } from "../../common/ModalStyles";
import logo from "../../../assets/sideSmLogo.png";
import deleteIcon from "../../../assets/deleteIcon.png";
import { closeModal } from "../../../stores/modal";

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  img {
    width: 60px;
    margin-right: 30px;
  }
  
  p {
    font-size: 40px;
    margin-right: 0px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    max-width: 80%; 
  }
`;

const CoverList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; 
  max-height: 400px; 
`;

const CoverItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #ccc;
  padding: 10px 0;
  width: 100%;

  span:first-child {
    flex: 1; // 커버명과 가수명이 더 많은 공간을 차지하도록 설정
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:nth-child(2) {
    flex: 1.12;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Line = styled.hr`
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 10px 0;
`;

export const CloseButton = styled.div`
  width: 36px;
  height: 34px;
  border-radius: 50%;
  background: #000000;
  color: #BFEA44;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CoverName = styled.div`
  width: 15%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
`;

const Creator = styled.div`
  flex-grow: 1;
  margin-left: 30%; /* 커버명과의 간격을 30%로 설정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
`;

const TotalCount = styled.div`
  /* 총 곡수는 flex-grow를 사용하지 않고, 필요한 만큼의 공간만 사용하도록 함 */
  width: 65px;
  color: #888888;
  white-space: nowrap;
  background: #D9D9D9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  const dispatch = useDispatch();
  const { playlistCode, playlistName, createTime } = useSelector((state: RootState) => state.playlists.selectedPlaylist) ?? { playlistCode: '', playlistName: '', createTime: '' };
  const [data, setData] = useState<PlaylistDetailInterface | null>(null);
  const baseURL = "https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com";

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
      <Content $width={40} $height={40} $borderRadius={30}>
        
        <ModalHeader>
          <img src={logo} alt="sorimaeul logo" />
          <p>{playlistName}</p>
          <CloseButton onClick={() => dispatch(closeModal())}>x</CloseButton>
        </ModalHeader>
        <InfoContainer>
        <CoverName>커버명</CoverName>
          <Creator>크리에이터</Creator>
          <TotalCount>총 {data?.playlist.length}곡</TotalCount>
          </InfoContainer>
          <Line />
        <div>
          <CoverList>
            {data?.playlist.map((cover, index) => (
              <CoverItem key={index}>
                <span>{cover.title}-{cover.singer}({cover.coverSinger})</span>
                <span>{cover.nickname} </span>
                <img src={deleteIcon} onClick={()=>deletCoverFromPlaylist(cover.coverCode)} />

              </CoverItem>
            ))}
          </CoverList>
        </div>
      </Content>
    </>
  )
}

export default PlaylistDetailModal;