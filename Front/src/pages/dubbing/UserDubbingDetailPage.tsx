import ColorLine from "../../components/dubbing/ColorLine";
import styled from "styled-components";
import { getUserVideo } from "../../utils/dubbingAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import smile from "../../assets/smiling.png";
import defaultProfile from "../../assets/profile.png";
import deleteIcon from "../../assets/deleteIcon.png";
import editIcon from "../../assets/editIcon.png";
import CommentComponent from "../../components/common/Comment";
import { getDubComment } from "../../utils/commentAPI";
import { useDispatch } from "react-redux";
import { setCategory, setComments, setSelectedPostId } from "../../stores/comment";

const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  gap: 1rem;

  .title {
    font-size: 2.25rem;
    font-family: 'GmarketSansBold';
  }
  
  .video {
    height: 29.3rem;
    border-radius: 5px;
  }

  .profile-box {
    height: 2.625rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .75rem;
    .profile {
      height: 2.625rem;
      width: 2.625rem;
      border-radius: 50%;
      border: .2px solid #A3A3A3;
    }
  }

  .like-box {
    display: flex;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    .smile {
      height: 100%;
    }
    .count {
      font-size: 2rem;
      font-family: 'GmarketSansBold';
      padding-top: .4rem;
    }
  }

  .button-box {
    display: flex;
    gap: .5rem;
    .icon {
      height: 80%;
    }
  }

  .description-box {
    background: #EEEEEE;
    border-radius: 15px;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: 'GmarketSansLight';
    .description {
      font-size: 1rem;
    }
    .date {
      font-size: .75rem;
      text-align: right;
    }
  }
`

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

interface InfoData {
  dubCode: number;
  dubName: string;
  dubDetail: string;
  createdTime: string;
  nickname: string;
  profileImage: string;
  likeCount: number;
  thumbnailPath: string;
  isLiked: number;
}

function UserDubbingDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  
  const [info, setInfo] = useState<InfoData | null>(null);

  const getUserVideoData = async () => {
    if (params.dubCode) {
      const res = await getUserVideo(params.dubCode);
      setInfo(res);
    }
  };

  const getComments = async () => {
    if (params.dubCode) {
      const res = await getDubComment(params.dubCode);
      dispatch(setComments(res));
      dispatch(setSelectedPostId(params.dubCode));
      dispatch(setCategory('dub'));
    }
  }

  useEffect(() => {
    getUserVideoData();
    getComments();
  }, [params.dubCode])

  return (
    <>
      <ColorLine />
      <Container>
        <h1 className="title">{info?.dubName}</h1>
        <img className="video" src={info?.thumbnailPath} alt="" />
        <div className="flex justify-between items-center">
          <div className="profile-box">
            <img className="profile" src={info?.profileImage ? info.profileImage : defaultProfile} alt="" />
            <p>{info?.nickname}</p>
          </div>
          <div className="flex gap-4 justify-center items-center h-full">
            <div className="like-box">
              <img className="smile" src={smile} alt="smile" />
              <p className="count">+ {info?.likeCount}</p>
            </div>
            <div className="button-box">
              <Button>
                <img className="icon" src={editIcon} alt="" />
                <p>수정</p>
              </Button>
              <Button >
                <img className="icon" src={deleteIcon} alt="" />
                <p>삭제</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="description-box">
          <p className="description">{info?.dubDetail}</p>
          <p className="date">{info?.createdTime}</p>
        </div>
        <CommentComponent width={100} />
      </Container> 
    </>
  )
}

export default UserDubbingDetailPage;