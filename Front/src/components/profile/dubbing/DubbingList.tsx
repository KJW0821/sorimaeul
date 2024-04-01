import MenuDescription from "../MenuDescription";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .menu {
    width: 100%;
    display: flex;
    border-top: 1px solid black;
    border-bottom: 1px solid #BBBBBB;
    padding: .5rem;
    .content {
      width: 60%;
    }

    .state {
      width: 12%;
    }

    .date {
      width: 14%;
    }

    .button {
      width: 11.8%;
    }
  }
`;

export interface DubbingData {
  dubCode: string;
  dubName: string;
  dubDetail: string;
  createdTime: string;
  thumbnailPath: string;
  isPublic: boolean;
  isComplete: boolean;
}

function DubbingList() {
  return (
    <>
       <MenuDescription bigText={"더"} middleText={"빙 컨텐츠"} smallText={"내가 만든 더빙 숏폼"} />
       <Container>
        <div className="menu">
          <p className="content">컨텐츠</p>
          <p className="state">공개 상태</p>
          <p className="date">게시 날짜</p>
          <p className="button"></p>
        </div>

       </Container>
    </>
  )
}

export default DubbingList;