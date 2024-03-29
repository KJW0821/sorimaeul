import { useEffect, useState } from "react";
import { getMyCovers } from "../../../utils/coverAPI";
import { CoverListInterface } from "../../aiCover/CoverInterface";
import { styled } from "styled-components";
import { Button } from "../../common/Button";
import { useNavigate } from "react-router-dom";

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  gap: 15px;
`;

// 상태에 따른 배경색과 조금 더 진한 배경색 설정
const getStatusColor = ($complete: boolean, $public: boolean = false) => {
  if (!$complete) return { main: '#FAD02E', dark: '#C7961E' }; // 미완료(변환중)
  if ($public) return { main: '#90EE90', dark: '#5CA85C' }; // 공개(게시)
  return { main: '#FFB6C1', dark: '#C97891' }; // 비공개(미게시)
};

const CoverContent = styled.div<{ $complete: boolean; $public?: boolean }>`
  width: 864px;
  height: 50px;
  background: ${({ $complete, $public }) => getStatusColor($complete, $public).main};
  border: 1px solid #A0A0A0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
`;

const StatusIndicator = styled.div<{ $complete: boolean; $public?: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 10px;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $complete, $public }) => getStatusColor($complete, $public ?? false).dark};
    margin-right: 5px;
  }
`;

const StatusDescription = styled.span`
  font-size: 14px;
  margin-right: auto; 

`;


const CoverInfo = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const CoverText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  margin: 10px;
  text-overflow: ellipsis;
  max-width: 70%;
`;

function CoverBox() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyCovers();
        setDataList({
          covers: data.covers,
          totalPages: data.totalPages
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

 
  return (
    <CoverContainer>
    {dataList && dataList.covers?.map((cover) => (
      <CoverContent key={cover.coverCode} $complete={cover.complete} $public={cover.public}>
        <StatusIndicator $complete={cover.complete} $public={cover.public}>
          <StatusDescription>{cover.complete ? (cover.public ? '공개 ' : '비공개') : '변환 중'}</StatusDescription>
        </StatusIndicator>
        <CoverInfo>
          <CoverText > ♪ {cover.coverName} - {cover.coverSinger}</CoverText>
          <CoverText> (원곡) {cover.title} - {cover.singer} </CoverText>
          {/* {
              cover.storagePath &&
              <audio src={`https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com/${cover.storagePath}`} controls />
            } */}
        </CoverInfo>
        <Button onClick={() => {
        if (cover.complete && cover.public) {
        // 공개(게시) 상태면 상세 조회 페이지로 이동
        navigate(`/cover/${cover.coverCode}`);
        } else {
        // 공개되지 않은 상태(비공개 또는 변환 중)면 게시 정보 설정 및 확인 페이지로 이동
        navigate(`/cover/board/${cover.coverCode}`);
        }
}}>
  관리
</Button>
      </CoverContent>
    ))}
    </CoverContainer>
  )
}

export default CoverBox;