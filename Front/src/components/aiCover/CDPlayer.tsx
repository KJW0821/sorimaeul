import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";

const CDContainer = styled.div`
  border: 2px solid #ccc;
  padding: 20px;
  width: 213px;
  height: 350px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  cover: Cover;
}

const StyledImage = styled.img`
  border-radius: 50%;
  width: 200px; 
  height: 200px; 
  object-fit: cover; 
`;

const CDPlayer: React.FC<Props> = ({
  cover
}) => {
  const { coverCode, coverName, thumbnailPath, nickname, likeCount, coverSinger, singer, title } = cover;
  const navigate = useNavigate();

  return (
    <CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <StyledImage src={thumbnailPath} alt={title} />
      <p>커버 제목: {coverName}</p>
      <p>{singer} - {title} ({coverSinger})</p>

      <p>업로드한 사용자: {nickname}</p>
      <p>좋아요 수: {likeCount}</p>
    </CDContainer>
  );
}

export default CDPlayer;