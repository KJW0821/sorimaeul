import { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import deleteIcon from "../../assets/deleteIcon.png";
import { deleteComment } from "../../utils/commentAPI";

const CommentContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 1rem;
  margin: 2rem auto;

  .title {
    font-size: 2.2rem;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center; 
  gap: 8px;
`;


const CommentInputSection = styled.div`
  display: flex;
  gap: 10px;
`;

const InputBox = styled.input`
  width: 80%;
  background: #FFFFFF;
  border: 1px solid #CECECE;
  border-radius: 5px;
  flex-grow: 1;
  margin-right: 10px;
  height: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 5px;
`
interface LineInterface {
  $color?: string;
  $height?: number;
}

const Line = styled.div<LineInterface>`
  height: ${(props) => (props.$height ? `${props.$height}rem` : "0.01rem")};;
  background-color: ${(props) => props.$color || "#000000"};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CommentList = styled.div`
  // 댓글 리스트 스타일
`;

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
  padding: 10px; 
  border-radius: 5px;
  background-color: #F9F9F9; 
  margin-bottom: 10px; 
`;

const CommentContent = styled.p`
  margin: 0;
  font-family: GmarketSansLight;
`;

interface Comment {
  commentCode: string;
  nickname: string;
  profileImage: string;
  content: string;
  time: string;
}

interface CommentProps {
  comments: Comment[];
  onCommentSubmit: (content: string) => Promise<void>; // 댓글 제출 함수, 비동기로 가정
}

const CommentComponent: React.FC<CommentProps> = ({ comments, onCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');
  const logginedUserImg = useSelector((state: RootState) => state.user.profileImage);
  const logginedUser = useSelector((state: RootState) => state.user.nickname);

  const handleDeleteComment = async (commentCode: string) => {
    try {
      const res = await deleteComment(commentCode);
      console.log(res);
    } catch (err) {
      console.error("댓글 삭제 실패", err);
    }
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await onCommentSubmit(newComment);
    setNewComment(''); // 댓글 제출 후 입력창 초기화
  };



  return (
    <CommentContainer>
      <TitleSection>
        <h2 className="title">댓글</h2>
        <span className="text-orange-400 pt-2">{comments.length}개</span>
      </TitleSection>
      <CommentInputSection>
        <img src={logginedUserImg} className="rounded-full w-10 h-10 mr-4 pl-2" alt="Current User ProfileImage" />
        <Form onSubmit={submitHandler}>
          <InputBox
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <Button type="submit" $width={5} $height={2.5} $marginTop={0} $marginLeft={0} disabled={!newComment}>등록</Button>
        </Form>
      </CommentInputSection>
      <Line $color="#FDA06C" />
      <CommentList>
        {comments && comments.map(({ commentCode, nickname, profileImage, content, time }) => (
          <CommentItem key={commentCode}>

            <img src={profileImage} className="rounded-full w-10 h-10 mr-4 pl-2" alt={nickname} />
            <div style={{ flexGrow: 1 }}>
              <span>{nickname} <span className="text-stone-300 text-xs">{time}</span></span>
              <CommentContent>{content}</CommentContent>
            </div>
            { logginedUser === nickname &&
             <button className="text-stone-400 flex items-center text-sm pb-3 pr-4"
             onClick={() => handleDeleteComment(commentCode)}>
              <span className="pb-0">삭제</span>
             <img src={deleteIcon} alt="Delete Icon" className="pb-1 ml-2"/>
             </button>
             }
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentComponent;