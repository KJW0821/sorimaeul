import styled from "styled-components";
import { VideoData } from "../../../pages/dubbing/DubbingListPage";

const Container = styled.div`
  width: 15.7%;
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
      right: 0%;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 2px;
      font-size: 0.4rem;
      width: 14.5%;
      height: 11.5%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

const DubbingSourceCard: React.FC<VideoData> = ({thumbnailPath, sourceName, videoPlaytime}) => {
  return (
    <Container>
      <div className="img-box">
        <img className="img" src={thumbnailPath} alt="thumbnail" />
        <div className="playtime">{videoPlaytime}</div>
      </div>
      <p className="title">{sourceName}</p>
    </Container>
  )
}

export default DubbingSourceCard;