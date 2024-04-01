import { useNavigate } from "react-router-dom";
import { Cover } from "./CoverInterface"
import styled from 'styled-components';
import heart from "../../assets/heart.png";

const CardContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: -2rem;
  padding: 7px;
  width: 250px;
  cursor: pointer;
`;

const ThumbnailImage = styled.img`
  width: 100%; 
  height: auto; 
  border-radius: 2px; 
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Nickname = styled.p`
  flex-grow: 1;
  margin-left: 10px;
  margin-top: 0.5rem;
  font-size: 1rem; 
  color: #575757;
`;

const ProfileLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 30px; 
  height: 30px;
  border-radius: 50%; 
  margin-right: 0.5rem;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIcon = styled.img`
  margin-right: 10px;
  width: 24px; 
  height: auto; 
`;

const LikeCount = styled.p`
  margin-right: 10px;
  font-size: 1.4rem; 
  margin-top: 4px;
`;

const SongInfo = styled.p`
  width: 230px;
  height: 22px;
  line-height: 22px;
  font-size: 0.9rem; 
  color: #A3A3A3;
  overflow: hidden;
  white-spce: nowrap;
  text-overflow: ellipsis;
`;




interface Props {
  cover: Cover;
}

const CoverCard: React.FC<Props> = ({
  cover
}) => {
  const { coverCode, coverName, thumbnailPath, profileImage, nickname, likeCount, coverSinger, singer, title } = cover;
  const navigate = useNavigate();
  const baseURL = "https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com";

  return (
  <CardContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <ThumbnailImage src={`${baseURL}${thumbnailPath}`} alt={title} />
      <Title>{coverName}</Title>
      <ProfileLine>
        <ProfileInfo>
          <ProfileImage src={`${baseURL}${profileImage}`} />
          <Nickname>{nickname}</Nickname>
        </ProfileInfo>
        <LikeContainer>
          <HeartIcon src={heart} alt="Heart" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ProfileLine>
      <SongInfo>{singer} - {title} ({coverSinger})</SongInfo>
    </CardContainer>
  );
};

export default CoverCard;