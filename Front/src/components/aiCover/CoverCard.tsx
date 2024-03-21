import { useNavigate } from "react-router-dom";
import { Cover } from "./CoverInterface"
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 2px solid #ccc; /* 네모 테두리 스타일 지정 */
  padding: 20px; /* 내부 패딩 지정 */
  border-radius: 8px; /* 둥근 테두리를 위한 border-radius 지정 */
  width: 400px; /* 특정한 너비로 고정 */
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
    <CardContainer onClick={()=> navigate(`/cover/${coverCode}`)}>
      <img src={thumbnailPath} alt={title} />
      <h2>{title}</h2>
      <p>원곡 가수: {singer}</p>
      <p>커버 가수: {coverSinger}</p>
      <p>커버 제목: {coverName}</p>
      <p>업로드한 사용자: {nickname}</p>
      <p>좋아요 수: {likeCount}</p>
    </CardContainer>
  );
};

export default CoverCard;