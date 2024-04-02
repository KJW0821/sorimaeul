import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCover, getCover, likeCover, unlikeCover } from "../../utils/coverAPI";
import { CoverDetailInterface } from "../../components/aiCover/CoverInterface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { openModal } from "../../stores/modal";
import CommentComponent from "../../components/common/Comment";
import { getCoverComment } from "../../utils/commentAPI";
import { setCategory, setComments, setSelectedPostId } from "../../stores/comment";
import { defaultCover, s3URL } from "../../utils/s3";
import ColorLine from "../../components/aiCover/ColorLine";
import styled from "styled-components";
import heart from "../../assets/heart.png";
import inactiveHeart from "../../assets/inactiveHeart.png";
import sumOrange from "../../assets/sumOrange.png";
import deleteIcon from "../../assets/deleteIcon.png";
import editIcon from "../../assets/editIcon.png";


// 상세 조회 페이지
const StyledContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 2rem auto;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-family: 'GmarketSansBold';
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

const MediaSection = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 50px;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 23rem; 
  height: 23rem; 
  margin: 0 auto; 
  border-radius: 50%;
  overflow: hidden; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 6rem;
    height: 6rem;
    border-radius: 50%; 
    background-color: white; 
    z-index: 2; 
  }
`;

const Thumbnail = styled.img`
  width: 100%; 
  height: 100%;
  display: block;
  position: relative;
  z-index: 1; 
`;

const InfoSection = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
`;

const InfoBox = styled.div`
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px dashed #000000;
  border-radius: 10px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
`;

const DetailLine = styled.div`
  height: 1px;
  background-color: #A3A3A3;
  margin: 0.5rem 0;
`;

const CoverDetail = styled.p`
  font-family: GmarketSansLight;
  font-size: 25px;
  min-height: 150px; 
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddPlaylistBtn = styled.button`
  font-size: 20px;
  background-color: #f5f5f5; /* 버튼 배경 색상 */
  color: #333; /* 버튼 글자 색상 */
  border: none;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px; /* 이미지와 텍스트 사이의 간격 */
  cursor: pointer;

  &:hover {
    background-color: #eee; /* 호버 시 배경 색상 변경 */
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  
  .like-count {
    font-size: 20px;
    margin-left: 15px;
    margin-right: 10px;
  }
`;

const SongInfo = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const SongDetail = styled.p`
  font-family: GmarketSansLight;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: .2rem;
  background: white;
  color: #797979;
  width: 4.6rem;
  font-size: 1.125rem;
  height: 2rem;
  border: 1px solid #797979;
  border-radius: 5px;

  .icon {
    height: 100%;
  }

  p {
    padding-top: .2rem;
  }
`
const ButtonBox = styled.div`
    display: flex;
    gap: .5rem;
    justify-content: flex-end;
    margin-right: 220px;
    .icon {
      height: 80%;
    }
`;

const CoverDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [data, setData] = useState<CoverDetailInterface | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const loggedInUserNickname = useSelector((state: RootState) => state.user.nickname);
  const coverCode = params.id;

  useEffect(() => {
    (async () => {
      try {
        if (coverCode) {
          const data = await getCover(coverCode);
          setData(data);
          console.log("상세 정보 페이지에서 조회된 데이터", data);
          setIsLiked(data.isLiked);
          setLikeCount(data.likeCount);
          const commentData = await getCoverComment(coverCode);
          dispatch(setCategory("cover"));
          dispatch(setSelectedPostId(coverCode));
          dispatch(setComments(commentData));
        }
      } catch (err) {
        console.error("커버 데이터를 가져오는데 실패했습니다.");
      }
    })();
  }, [coverCode, isLiked, dispatch]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (coverCode) {
        await deleteCover(coverCode);
        navigate(`/cover`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (coverCode) {
      if (isLiked) {
        // 이미 좋아요를 누른 상태라면 좋아요 취소
        try {
          await unlikeCover(coverCode);
          setIsLiked(false);
        } catch (err) {
          console.error("좋아요 취소 처리 중 오류가 발생했습니다.", err);
        }
      } else {
        // 좋아요를 누르지 않은 상태라면 좋아요를 시도
        try {
          await likeCover(coverCode);
          setIsLiked(true);
        } catch (err) {
          console.error("좋아요 처리 중 오류가 발생했습니다.", err);
        }
      }
    };
  };

  const openPlaylistAddModal = () => {
    dispatch(openModal({
      modalType: "playlistadd",
      payload: { coverCode: coverCode }
    }))
  };


  return (
    <>
      <ColorLine />
      {data &&
        <StyledContainer>
          <Title> {data.coverName} </Title>
          <ContentContainer>
            <MediaSection>
              <ThumbnailContainer>
                { data.thumbnailPath ? (
                  <Thumbnail src={s3URL + data.thumbnailPath} alt="Cover Thumbnail" />
                ) : (<Thumbnail src={defaultCover} alt="Cover Thumbnail"/>) }
                
              </ThumbnailContainer>
              <div>

                <audio className="mt-10" src={s3URL + `/${data.storagePath}`} controls />
              </div>
            </MediaSection>
            <InfoSection>
              <InfoBox>
                <Profile >
                  <ProfileImage src={s3URL + data.profileImage} alt="Creator Profile Image" />
                  <p className="nickname"> {data.nickname} </p>
                </Profile>
                <DetailLine />
                <CoverDetail> {data.coverDetail} </CoverDetail>
                <Actions>
                  <AddPlaylistBtn onClick={openPlaylistAddModal}>
                    <img src={sumOrange} alt="Button Icon" />
                    플레이리스트에 추가</AddPlaylistBtn>
                  <LikeContainer>
                    <span onClick={handleLike}>
                      {isLiked ? (
                        <img src={heart} alt="Active Heart" />
                      ) : (
                        <img src={inactiveHeart} alt="Inactive Heart" />
                      )}
                    </span>
                    <span className="like-count"> {data.likeCount}</span>
                  </LikeContainer>
                </Actions>
                <DetailLine />
                <SongInfo>
                  <p>노래 정보</p>
                  <SongDetail>노래 제목 : {data.title}</SongDetail>
                  <SongDetail>원곡 가수 : {data.singer}</SongDetail>
                  <SongDetail>AI 모델 : {data.coverSinger}</SongDetail>
                </SongInfo>
              </InfoBox>
            </InfoSection>
          </ContentContainer>
        </StyledContainer>

      }

      {/* 작성자만 수정/삭제 버튼 표시 */}
      <ButtonBox>
        {data && data.nickname === loggedInUserNickname &&
          <Button onClick={() => navigate(`/cover/board/${params.id}`)}>
            <img className="icon" src={editIcon} alt="edit icon" />
            <p>수정</p>
          </Button>}

        {data && data.nickname === loggedInUserNickname &&
          <Button onClick={handleDelete}>
            <img className="icon" src={deleteIcon} alt="delete icon" />
            <p>삭제</p>
          </Button>}
      </ButtonBox>

      {/* 댓글란 */}
      <CommentComponent />

    </>
  );
};

export default CoverDetailPage;