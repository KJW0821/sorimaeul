import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSourceVideo } from "../../../utils/dubbingAPI";

const Container = styled.div`
  
`

interface VideoData {
  videoSourceCode: number;
  sourceName: string;
  storagePath: string;
  createdTime: string;
  thumbnailPath: string;
  videoPlaytime: string;
  sourceDetail: string;
}

function SourceVideoInfo() {
  const params = useParams();
  const [videoInfo, setVideoInfo] = useState<VideoData | null>(null);

  const getVideoInfo = async () => {
    if (params.sourceCode) {
      const res = await getSourceVideo(params.sourceCode);
      setVideoInfo(res);
      console.log(res);
    }
  }

  useEffect(() => {
    getVideoInfo();
  }, [params.sourceCode])

  return (
    <Container>
      
    </Container>
  )
}

export default SourceVideoInfo;