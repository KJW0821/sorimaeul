import { useEffect, useState } from "react";
import { getSourceVideoList } from "../../utils/dubbingAPI";
import styled from "styled-components";
import DubbingSourceCard from "../../components/dubbing/contentList/DubbingSourceCard";

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(90deg, rgba(253, 255, 0, 0.7) 0%, rgba(99, 218, 255, 0.7) 100%), #26BA28;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .description {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }
`

const Title = styled.h1`
  font-family: "ClimateCrisisKRVF";
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
`

const ContentList = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;

  & > div:last-child {
    margin-right: auto;
  }
`

export interface VideoData {
  videoSourceCode: number;
  sourceName: string;
  thumbnailPath: string;
  videoPlaytime: string;
  createdTime: string;
  storagePath: string;
  sourceDetail: string;
}

function DubbingListPage() {
  const [page, setPage] = useState(1);
  const [videoList, setVideoList] = useState<VideoData[]>([]);

  const getSourceVideos = async () => {
    const res = await getSourceVideoList(page);
    setVideoList(res.videoSources);
  }

  useEffect(() => {
    getSourceVideos();
  }, [page])

  return (
    <>
      <ColorBlock>
        <div className="flex ml-32 items-end gap-4">  
          <Title>더빙 학원</Title>
          <p className="description">영상을 선택한 후, 직접 더빙해보세요!</p>
        </div>
      </ColorBlock>
      <ContentList>
        {
          videoList &&
          videoList.map((data) => (
            <DubbingSourceCard key={data.videoSourceCode} data={data} />
          ))
        }
      </ContentList>
    </>
  )
}

export default DubbingListPage;