import styled from "styled-components";
import { VideoData } from "./SoriAward";

const Container = styled.div`
  width: 23%;
  flex: 0 0 23%;
  box-sizing: border-box;
  margin: 1.5%;
  height: 13.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UserDubbingCard: React.FC<{ videoData: VideoData}> = ({ videoData }) => {
  return (
    <Container>
      <img src={videoData.thumbnailPath} alt="thumbnail" />
      <div>
        <div className="circle"><img src={videoData.profileImage} alt="" /></div>
        <p>{videoData.dubName}</p>
      </div>
      <p>작성자 {videoData.nickname}</p>
      <p>좋아요 {videoData.likeCount}개</p>
    </Container>
  )
}

export default UserDubbingCard;