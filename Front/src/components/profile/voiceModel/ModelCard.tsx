import { ModelData } from "./ModelList";
import styled from "styled-components";
import defaultImg from "../../../assets/wave1.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 0 0 48%;
  box-sizing: border-box;
  margin: 1%;
  height: 9.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid black;
  border-radius: 1.875rem;
  margin-bottom: 1rem;

  .img {
    width: 6.375rem;
    height: 6.375rem;
    border-radius: 50%;
  }
`

const InfoBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 1.5rem;
  gap: .5rem;

  .title {
    font-size: 1.25rem;
  }

  .sm-font {
    font-size: 0.75rem;
    padding-top: .2rem;
  }

  .gray {
    color: #939393;
  }

  .progress-box {
    border-radius: 3.125rem;
    background: #D9D9D9;
    display: flex;
    align-items: center;
    justify-items: center;
    padding: .5rem .75rem;
  }
`

const ModelCard: React.FC<{ data: ModelData }> = ({data}) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/model/${data.modelCode}`)}>
      <img className="img" src={data.imagePath ? data.imagePath : defaultImg} alt="" />
      <InfoBox>
        <div className="flex justify-between items-end">
          <p className="title">{data.modelName}</p>
          <p className="sm-font gray">
            {
              data.state === 0 && '녹음중' 
              || 
              data.state === 1 && '학습전' 
              || 
              data.state === 2 && '학습중'
              ||
              data.state === 3 && '학습 완료'
            }
          </p>
        </div>
        <hr />
        <div className="progress-box">
          <p className="sm-font">녹음 진행률: {(Math.round((data.recordCount/200)*1000*100))/1000}% ({data.recordCount}/200)</p>
        </div>
      </InfoBox>
    </Container>
  )
}

export default ModelCard;