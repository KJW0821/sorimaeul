import styled from "styled-components";
import { VideoData } from "../../../pages/dubbing/DubbingListPage";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 0 0 19%;
  box-sizing: border-box;
  margin: 0.5%;
  height: 8.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .img-box {
    position: relative;
    height: 88%;
    .img {
      height: 100%;
      width: 100%;
    }
    .playtime {
      position: absolute;
      right: 0.3rem;
      bottom: 0.3rem;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 2px;
      font-size: 0.4rem;
      width: 14.5%;
      height: 11.5%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
`

const DubbingSourceCard: React.FC<{data: VideoData}> = ({data}) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/dubbing/${data.videoSourceCode}`)}>
      <div className="img-box">
        <img className="img" src={data.thumbnailPath} alt="thumbnail" />
        <div className="playtime">{data.videoPlaytime}</div>
      </div>
      <p className="title">{data.sourceName}</p>
    </Container>
  )
}

export default DubbingSourceCard;