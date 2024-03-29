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

interface Props {
  $complete: boolean;
}

const CoverContent = styled.div<Props>`
  width: 864px;
  height: 50px;
  background: ${({ $complete }) => $complete ? '#FFFFFF' : '#F0F0F0'};
  border: 1px solid #A0A0A0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
`;

const CoverInfo = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const CoverText = styled.p<Props>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40%;
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
      <CoverContent key={cover.coverCode} $complete={cover.complete}>
        <CoverInfo>
          <CoverText $complete={cover.complete}>{cover.coverName} + {cover.coverSinger}</CoverText>
          {
              cover.storagePath &&
              <audio src={`https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com/${cover.storagePath}`} controls />
            }
          <p>공개 여부: {cover.public ? '공개' : '비공개'}</p>
        </CoverInfo>
        <Button onClick={() => navigate(`/cover/board/${cover.coverCode}`)}>관리</Button>
      </CoverContent>
    ))}
    </CoverContainer>
  )
}

export default CoverBox;