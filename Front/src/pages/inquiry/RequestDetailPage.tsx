import styled from "styled-components";
import { Line } from "../../components/common/Line";
import { Button } from "../../components/common/Button";
import ColorLine from "../../components/inquiry/ColorLine";
import { useNavigate, useParams } from "react-router-dom";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: .75rem;
  width: 75%;
  margin: 0 auto;

  .title {
    width: 100%;
    font-size: 2rem;
  }

  .date {
    width: 100%;
    font-size: 0.75rem;
    font-family: 'GmarketSansLight';
    text-align: right;
  }

  .content {
    width: 100%;
    font-size: 1rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .button-box{
    margin-left: auto;
    display: flex;
    gap: .5rem;
  }
`

function RequestDetailPage() {
  const navigate = useNavigate();
  const params =  useParams();

  const data = {
    id: 2,
    title: "짱구는 못말려 영상도 올려주세요",
    content: "짱구는 못말려 영상도 재미있던데 이거도 올려주세요!!\n\nhttps://www.youtube.com/watch?v=4QUgbmFUe_M&ab_channel=%EC%A7%B1%EA%B5%AC%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8",
    createdTime: "2024-03-19"
  }

  return (
    <>
      <ColorLine />
      <ContentBox>
        <h2 className="title">짱구는 못말려 영상도 올려주세요</h2>
        <Line />
        <div className="mb-4 flex flex-col gap-4">
          <p className="date">{data.createdTime}</p>
          <div className="content">{data.content}</div>
        </div>
        <Line />
        <div className="button-box">
          <Button onClick={() => navigate('/request')} $marginLeft={0} $marginTop={0} $width={4.375} $height={2}>목록보기</Button>
          <Button onClick={() => navigate(`/request/${params.id}/edit`)} $marginLeft={0} $marginTop={0} $width={4.375} $height={2} $background="#28BEFF">수정</Button>
          <Button $marginLeft={0} $marginTop={0} $width={4.375} $height={2}>삭제</Button>
        </div>
      </ContentBox>
    </>
  )
}

export default RequestDetailPage;