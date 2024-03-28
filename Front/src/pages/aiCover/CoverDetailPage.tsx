import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCover, getCover, likeCover, unlikeCover } from "../../utils/coverAPI";
import { CoverDetailInterface } from "../../components/aiCover/CoverInterface";
import { Button } from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { openModal } from "../../stores/modal";
import CommentComponent from "../../components/common/Comment";
import { getCoverComment } from "../../utils/commentAPI";
import { setCategory, setComments, setSelectedPostId } from "../../stores/comment";
import ColorLine from "../../components/aiCover/ColorLine";
import styled from "styled-components";
import heart from "../../assets/heart.png";
import inactiveHeart from "../../assets/inactiveHeart.png";

const Container = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 2rem auto;
  gap: 1rem;
  
  .title {
    font-size: 2.25rem;
    font-family: 'GmarketSansBold';
  }

  .content-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;

    .media-section {
      flex: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-top: 50px;

      .thumbnail {
        width: 330px;
        height: 330px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }

      .audio-player {
        width: 100%;
      }
    }

    .info-section {
      flex: 6;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 700px;
      .info-box {
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px dashed #000000;
        border-radius: 10px;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .profile-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
          }

          .nickname {
            margin: 5px;
            flex-grow: 1;
          }

          .created-time {
            /* 오른쪽 정렬을 위한 스타일 */
          }
        }

        .detail-line {
          height: 1px;
          background-color: #A3A3A3;
          margin: 0.5rem 0;
        }

        .cover-detail {
          font-family: GmarketSansLight;
          min-height: 150px; 
        }

        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .like-section {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            /* 좋아요 버튼과 좋아요 수 스타일 */
          }
        }

        .song-info {
          font-size: 1rem;
          margin-top: 0.5rem;

          .song-title,
          .original-singer,
          .cover-singer {
            font-family: GmarketSansLight;
            margin-top: 0.25rem;
          }
        }
      }
    }
  `

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
          console.log(data);
          setIsLiked(data.liked);
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
        <Container>
          <h1 className="title"> {data.coverName} </h1>
          <div className="content-container">

            <div className="media-section">
              <img className="thumbnail" src={data.thumbnailPath} alt="Cover Thumbnail" />
              <div className="auto-player">
                음원 저장 경로 {data.storagePath}
              </div>
            </div>
            <div className="info-section">
              <div className="info-box">
                <div className="profile">
                  <img className="profile-image" src="" alt="Creator Profile Image" />
                  <p className="nickname"> {data.nickname} </p>
                </div>
                <p className="detail-line" />
                <p className="cover-detail"> {data.coverDetail} </p>
                <div className="like-section">
                  <button onClick={openPlaylistAddModal}>플레이리스트에 추가</button>
                  <span onClick={handleLike}>
                    {isLiked ? (
                      <img src={heart} alt="Active Heart" />
                    ) : (
                      <img src={inactiveHeart} alt="Inactive Heart" />
                    )}

                  </span>
                  <span>좋아요 수 {data.likeCount}</span>
                  <p className="detail-line" />
                </div>
                <div className="song-info">
                  <p>노래 정보</p>
                  <p className="song-title">노래 제목: {data.title}</p>
                  <p className="original-singer">원곡 가수: {data.singer}</p>
                  <p className="cover-singer">목소리 모델: {data.coverSinger}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>

      }


      {data && data.nickname === loggedInUserNickname &&
        <Button onClick={() => navigate(`/cover/edit/${params.id}`)} $marginLeft={0} $marginTop={0}>수정</Button>}

      {data && data.nickname === loggedInUserNickname &&
        <Button onClick={handleDelete} $marginLeft={0} $marginTop={0}>삭제</Button>}
      <CommentComponent ></CommentComponent>

    </>
  );
};

export default CoverDetailPage;