import styled from "styled-components";

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .bold {
    font-family: 'GmarketSansBold';
  }

  .big-font {
    font-size: 3rem;
  }
`

function Complete() {
  return (
    <Container>
      <p className="bold big-font">음성 학습이 완료되었습니다.</p>
      <p>축하합니다! 생성된 음성 모델은 마이페이지에서 확인 가능합니다.</p>
      <p>음성 모델로 나만의 <span className="bold">더빙 영상</span>을 만들거나 <span className="bold">AI 커버</span>를 만들어보세요</p>
    </Container>
  )
}

export default Complete;