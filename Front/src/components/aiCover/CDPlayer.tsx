import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";
import heart from "../../assets/heart.png";




const CoverTitle = styled.p`
  font-size: 1rem; 
  margin-bottom: 5px; 
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
`;




const LikeSection = styled.div`
  display: flex;
  align-items: center;
`;

const LikeImage = styled.img`
  width: 24px; 
  height: 24px;

`;

const LikeCount = styled.p`
  font-size: 0.875rem; 
  margin-top: 4px;
`;

const SongInfo = styled.p`
  font-size: 0.7rem; 
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
    profileImage,
    nickname,
    likeCount,
    coverSinger,
    singer,
    title,
  } = cover;
  const navigate = useNavigate();
  console.log(cover);
  return (
    <div onClick={() => navigate(`/cover/${coverCode}`)}>
      확인
      <img src={thumbnailPath} alt={title} />
      <p>{coverName}</p>
      <div>
        <img src={profileImage} alt="Profile" /> {/* 프로필 이미지 경로 수정 필요 */}
        <p>{nickname}</p>
        <div>
          <LikeImage src={heart} alt="Like" />
          <LikeCount>{likeCount}</LikeCount>
        </div>
      </div>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
      확인
    </div>
  );
};

export default CDPlayer;
