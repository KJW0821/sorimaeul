import styled from "styled-components";
import videoImg from "../../../assets/video.png";
import ToggleButton from "../../common/ToggleButton";
import { useState } from "react";
import editIcon from "../../../assets/editIcon.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  .title {
    font-size: 2rem;
    font-family: 'GmarketSansBold';
    padding-top: .5rem;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 21rem;
  justify-content: space-between;

  .video {
    width: 48%;
    height: 100%;
  }

  .form {
    width: 48%;
    display: flex;
    flex-direction: column;
    font-size: 1.25rem;
    gap: .75rem;
    .content {
      flex-grow: 1;
      background: #EEEEEE;
      border-radius: 5px;
      padding: 1rem;
      resize: none;
      font-family: 'GmarketSansLight';
    }
    .button-box {
      display: flex;
      justify-content: space-between;
      .is-public {
        font-size: 1.125rem;
        font-family: 'GmarketSansLight';
      }
    }
    .description {
      font-size: 1rem;
      font-family: 'GmarketSansLight';
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

function DubbingContentForm() {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <Container>
      <div className="flex items-center gap-2">
        <img className="h-full" src={videoImg} alt="video" />
        <h2 className="title">영상 확인</h2>
      </div>
      <Content>
        <video className="video" controls src="" />
        <form className="form">
          <div className="flex gap-2 items-center">
            <label className="pt-1" htmlFor="title">제목:</label>
            <input className="grow pt-1 px-2 border border-gray-300 rounded" type="text" name="title" id="title" />
          </div>
          <textarea name="content" id="content" className="content" placeholder="영상 설명을 입력해주세요"></textarea>
          <div className="button-box">
            <div className="flex gap-2">
              <p className="is-public">공개여부</p>
              <ToggleButton isPublic={isPublic} setIsPublic={setIsPublic} color="#C9F647" />
            </div>
            <div className="flex gap-2">
              <Button><p>취소</p></Button>
              <Button>
                <img src={editIcon} alt="" className="icon" />
                <p>완료</p>
              </Button>
            </div>
          </div>
          <p className="description">tip. 비공개로 등록된 컨텐츠는 마이페이지에서 확인 가능합니다.</p>
        </form>
      </Content>
    </Container>
  )
}

export default DubbingContentForm;