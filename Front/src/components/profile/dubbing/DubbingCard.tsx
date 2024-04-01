import styled from "styled-components";
import { DubbingData } from "./DubbingList";
import { Button } from "../../common/Button";
import { s3URL } from "../../../utils/s3";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  height: 7.25rem;
  align-items: center;
  justify-content: space-between;

  .sm-font {
    font-size: 0.75rem;
    padding-top: .25rem;
  }

  .content {
    width: 60%;
    display: flex;
    height: 100%;
    justify-content: space-between;
    .img {
      height: 100%;
      width: 30%;
    }
    .text-box {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      width: 67%;
      .description {
        font-family: 'GmarketSansLight';
        color: #A0A0A0;
      }
    }
  }

  .state {
    width: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
  }

  .date {
    width: 14%;
    text-align: center;
  }

  .button {
    width: 11.8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
  }
`

const DubbingCard: React.FC<{ data: DubbingData }> = ({data}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="content">
        <img className="img" src={s3URL + data.thumbnailPath} alt="thumbnail" />
        <div className="text-box">
          <p>{data.dubName}</p>
          <p className="description">{data.dubDetail}</p>
        </div>
      </div>
      <div className="state">
        <svg width={"25%"} height={"100%"} viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 0C11.4545 0 3.30273 6.01267 0 14.5C3.30273 22.9873 11.4545 29 21 29C30.5455 29 38.6973 22.9873 42 14.5C38.6973 6.01267 30.5455 0 21 0ZM21 24.1667C15.7309 24.1667 11.4545 19.836 11.4545 14.5C11.4545 9.164 15.7309 4.83333 21 4.83333C26.2691 4.83333 30.5455 9.164 30.5455 14.5C30.5455 19.836 26.2691 24.1667 21 24.1667ZM21 8.7C17.8309 8.7 15.2727 11.2907 15.2727 14.5C15.2727 17.7093 17.8309 20.3 21 20.3C24.1691 20.3 26.7273 17.7093 26.7273 14.5C26.7273 11.2907 24.1691 8.7 21 8.7Z" fill="#C9F647"/>
        </svg>
        <p className="sm-font">공개</p>
      </div>
      <p className="date sm-font">{data.createdTime.split('T')[0]}</p>
      <div className="button">
        <Button $marginLeft={0} $marginTop={0} $width={3} $height={1.875} $background="#C9F647" $color="black">수정</Button>
        <Button $marginLeft={0} $marginTop={0} $width={3} $height={1.875}>삭제</Button>
      </div>
    </Container>
  )
}

export default DubbingCard;