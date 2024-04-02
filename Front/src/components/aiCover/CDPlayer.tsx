import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";
import { defaultCover, s3URL } from "../../utils/s3";
import heart from "../../assets/heart.png";


const CDContainer = styled.div`
  cursor: pointer;
`;

const CoverTitle = styled.p`
  font-size: 1rem; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
  border-radius: 50%; 
  overflow: hidden;
  object-fit: cover;
`;

const ThumbnailImage = styled.img`
  width: 100%; 

  border-radius: 50%;
  z-index: 1;
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  background: white; 
  z-index: 2;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;

const ProfileImage = styled.img`
  width: 30px; 
  height: 30px
  border-radius: 50%; 
  margin-right: 0.5rem;
`;

const Nickname = styled.p`
  width: 180px;
  height: 20px;
  flex-grow: 1;
  margin-left: 5px;
  margin-top: 0.1rem;

  font-size: 14px; 
  color: #575757;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIcon = styled.img`
  width: 20px; 
  height: auto; 
  margin-right: 4px;
`;

const LikeCount = styled.p`
  font-size: 0.875rem; 
  margin-top: 3px;
`;

const SongInfo = styled.p`
  width: 220px;
  font-size: 0.7rem; 
  color: #A3A3A3;
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
`;

interface Props {
  cover: Cover;
}

const CDPlayer: React.FC<Props> = ({ cover }) => {
  const {
    coverCode,
    coverName,
    thumbnailPath,
    profileImage,
    nickname,
    likeCount,
    coverSinger,
    singer,
    title,
  } = cover;
  const navigate = useNavigate();

  return (
    <CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <ThumbnailContainer>
        {thumbnailPath ? (
           <ThumbnailImage src={ s3URL + thumbnailPath} alt={title} />
        ) : (<ThumbnailImage src={defaultCover} />)}
      <CenterCircle />
      </ThumbnailContainer>
      <CoverTitle>{coverName}</CoverTitle>
      <ProfileInfo >
        <ProfileImage src={ s3URL + profileImage } alt="Profile" /> 
        <Nickname>{nickname}</Nickname>
        <LikeContainer>
          <HeartIcon src={heart} alt="Like" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ProfileInfo>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
    </CDContainer>
  );
};

export default CDPlayer;
