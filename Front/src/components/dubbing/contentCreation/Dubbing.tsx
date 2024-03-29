import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { VideoData } from "../contentDetail/SourceVideoInfo";
import { getSourceVideo, getOriginVoices } from "../../../utils/dubbingAPI";

const Container = styled.div`
  width: 90%;
`

interface VoiceData {
  videoSourceCode: number;
  voicePath: string;
  voiceIndex: number;
  voiceName: string;
  videoPath: string;
}

function Dubbing() {
  const params = useParams();
  const [videoInfo, setVideoInfo] = useState<VideoData>();
  const [originVoiceList, setOriginVoiceList] = useState<VoiceData>();

  const getVideoInfo = async () => {
    if (params.sourceCode) {
      const res = await getSourceVideo(params.sourceCode);
      setVideoInfo(res);
      console.log(res);
    }
  };

  const getOriginVoiceData = async () => {
    if (params.sourceCode) {
      const res = await getOriginVoices(params.sourceCode);
      console.log(res);
    }
  }

  useEffect(() => {
    getVideoInfo();
    getOriginVoiceData();
  }, [params.sourceCode])

  return (
    <Container>
      <div>
        <label htmlFor="title">제목:</label>
        <input type="text" name="title" id="title" placeholder="최대 40글자까지 작성 가능합니다" />
      </div>
      <div className="video-box">
        <img src={videoInfo?.thumbnailPath} alt="" />
      </div>
      <div>
        <div className="flex gap-4">
          <p>캐릭터</p>
          <p>더빙</p>
          <p>음성 모델</p>
          <p>피치 조절</p>
          <p>목소리 확인</p>
        </div>
        <div>
          <div>

          </div>
        </div>
      </div>
    </Container>  
  )
}

export default Dubbing;