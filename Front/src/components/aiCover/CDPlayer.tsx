import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";

const CDContainer = styled.div`
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 50%; /* 원형 모양 생성 */
  width: 400px;
  height: 400px; /* 원형을 만들기 위해 너비와 높이를 동일하게 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  cover: Cover;
}

const CoverCard: React.FC<Props> = ({
  cover
}) => {
  const { coverCode, coverName, thumbnailPath, nickname, likeCount, coverSinger, singer, title } = cover;
  const navigate = useNavigate();

  return (
    < CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <img src={thumbnailPath} alt={title} />
      <h2>{title}</h2>
      <p>원곡 가수: {singer}</p>
      <p>커버 가수: {coverSinger}</p>
      <p>커버 제목: {coverName}</p>
      <p>업로드한 사용자: {nickname}</p>
      <p>좋아요 수: {likeCount}</p>
    </CDContainer>
  );
}

export default CoverCard;