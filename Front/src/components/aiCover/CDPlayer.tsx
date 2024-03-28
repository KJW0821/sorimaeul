import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";
import heart from "../../assets/heart.png";

const CDContainer = styled.div`
  border: 2px solid #ccc;
  padding: 20px;
  width: 15rem;
  height: 350px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  width: 14rem;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px; // 커버 제목과의 간격
`;

const CoverTitle = styled.p`
  font-size: 1.3rem; // 글자 크기 설정
  margin-bottom: 5px; // 프로필 이미지와의 간격
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px; // 다음 내용과의 간격
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 30px; // 프로필 이미지 크기
  height: 30px;
  object-fit: cover;
`;

const Nickname = styled.p`
  flex-grow: 1;
  margin-left: 10px;
  font-size: 0.875rem; 
  color: #575757;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
`;

const LikeImage = styled.img`
  width: 24px; 
  height: 24px;
  margin-right: 5px; 
`;

const LikeCount = styled.p`
  font-size: 0.875rem; 
  margin-top: 4px;
`;

const SongInfo = styled.p`
  font-size: 0.7rem; 
  font-family: 
  color: #A3A3A3;
`;

interface Props {
  cover: Cover;
}

const CDPlayer: React.FC<Props> = ({ cover }) => {
  const {
    coverCode,
    coverName,
    thumbnailPath,
    nickname,
    likeCount,
    coverSinger,
    singer,
    title,
  } = cover;
  const navigate = useNavigate();

  return (
    <CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <StyledImage src={thumbnailPath} alt={title} />
      <CoverTitle>{coverName}</CoverTitle>
      <ProfileSection>
        <ProfileImage src="/path/to/profile/image.jpg" alt="Profile" /> {/* 프로필 이미지 경로 수정 필요 */}
        <Nickname>{nickname}</Nickname>
        <LikeSection>
          <LikeImage src={heart} alt="Like" /> 
          <LikeCount>{likeCount}</LikeCount>
        </LikeSection>
      </ProfileSection>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
    </CDContainer>
  );
};

export default CDPlayer;
