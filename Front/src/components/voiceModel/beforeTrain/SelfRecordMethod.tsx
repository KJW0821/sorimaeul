import styled from "styled-components";

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
  return (
    <Container>
      <div className="guide">
        <p>음성 학습에 필요한 목소리를 직접 녹음합니다.</p>
        <p>진행률이 80% 이상이어야 학습 진행이 가능합니다.</p>
        <p>(최소 30분 이상의 시간이 소요되며, 중간 저장이 가능합니다.)</p>
      </div>
      <div className="record-controller">
        <p className="start">녹음 시작하기</p>
      </div>
    </Container>
  )
}

export default SelfRecordMethod;