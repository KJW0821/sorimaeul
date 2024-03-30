import { useEffect, useState } from "react";
import { getMyCovers } from "../../../utils/coverAPI";
import { Cover } from "../../aiCover/CoverInterface";
import { styled } from "styled-components";
import { Button } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import MenuDescription from "../MenuDescription";
import Pagination from "../../common/Pagination";

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  gap: 15px;
`;

// 상태에 따른 배경색과 조금 더 진한 배경색 설정
const getStatusColor = ($isComplete: boolean, $isPublic: boolean = false) => {
  if (!$isComplete) return { main: '#FAD02E', dark: '#C7961E' }; // 미완료(변환중)
  if ($isPublic) return { main: '#90EE90', dark: '#5CA85C' }; // 공개(게시)
  return { main: '#FFB6C1', dark: '#C97891' }; // 비공개(미게시)
};

const CoverContent = styled.div<{ $isComplete: boolean; $isPublic?: boolean }>`
  width: 864px;
  height: 50px;
  background: ${({ $isComplete, $isPublic }) => getStatusColor($isComplete, $isPublic).main};
  border: 1px solid #A0A0A0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
`;

const StatusIndicator = styled.div<{ $isComplete: boolean; $isPublic?: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 10px;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $isComplete, $isPublic }) => getStatusColor($isComplete, $isPublic ?? false).dark};
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataList, setDataList] = useState<Cover[]>([]);
  
  const getMyAICover = async () => {
    const data = await getMyCovers(page);
    setDataList(data.covers);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    getMyAICover();
  }, [page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
 
  return (
    <>
    <MenuDescription bigText={"A"} middleText={"I 커버"} smallText={"나의 AI 커버"} />
    <CoverContainer>
      
    {dataList && dataList.map((cover) => (
      <CoverContent key={cover.coverCode} $isComplete={cover.isComplete} $isPublic={cover.isPublic}>
        <StatusIndicator $isComplete={cover.isComplete} $isPublic={cover.isPublic}>
          <StatusDescription>{cover.isComplete ? (cover.isPublic ? '공개 ' : '비공개') : '변환 중'}</StatusDescription>
        </StatusIndicator>
        <CoverInfo>
          <CoverText > ♪ {cover.coverName} - {cover.coverSinger}</CoverText>
          <CoverText> (원곡) {cover.title} - {cover.singer} </CoverText>
          <span>생성일: {cover.createdTime}</span>
        </CoverInfo>
        <Button onClick={() => {
        if (cover.isComplete && cover.isPublic) {
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
    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} color="#BFEA44" />

    </>
  )
}

export default CoverBox;