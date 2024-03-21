import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { Button } from "../../common/Button";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .guide {
    font-size: 0.875rem;
  }
  .record-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 6rem;
    background-color: #8F8F8F;
    .start {
      font-size: 1.5rem;
    }
  }
`

function SelfRecordMethod() {
  const modelInfo = useSelector((state: RootState) => state.voiceModel);

  const startRecord = () => {
    if (modelInfo.learnState === 0) {
      console.log('녹음 페이지로 가기');
    }
  }

  return (
    <Container>
      <div className="guide">
        <p>음성 학습에 필요한 목소리를 직접 녹음합니다.</p>
        <p>진행률이 80% 이상이어야 학습 진행이 가능합니다.</p>
        <p>(최소 30분 이상의 시간이 소요되며, 중간 저장이 가능합니다.)</p>
      </div>
      <div onClick={startRecord} className="record-controller">
        {
          modelInfo.recordCount > 0 ?
          <>
            <p>모델명: {modelInfo.modelName}</p>
            <p>녹음 진행률: {modelInfo.recordCount}/200</p>
            <div>
              <Button>이어하기</Button>
              <Button>새로 하기</Button>
            </div>
          </>
          :
         <p className="start">녹음 시작하기</p>
        }
      </div>
    </Container>
  )
}

export default SelfRecordMethod;