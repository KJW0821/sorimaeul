import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import { getPopularSourceVideoList } from "../../utils/dubbingAPI";
import { VideoData } from "../../pages/dubbing/DubbingListPage";

const Card = styled.div`
  width: 300px;
  height: 200px;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  border-radius: 10px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SourceName = styled.div`
  padding: 15px;
  font-size: 18px;
`;

const DubbingContents: React.FC = () => {
  const [hotVideoList, setHotVideoList] = useState<VideoData[]>([]);
  const getHotVideos = async () => {
    const res = await getPopularSourceVideoList();
    setHotVideoList(res.videoSources);
  };

  useEffect(() => {
    getHotVideos();
  }, []);

  return (
    <>
      {hotVideoList.map((video, index) => (
        <Card key={index}>
          <Thumbnail src={video.thumbnailPath} alt="Thumbnail" />
          <SourceName>{video.sourceName}</SourceName>
        </Card>
      ))}
    </>
  );
};

export default DubbingContents;
