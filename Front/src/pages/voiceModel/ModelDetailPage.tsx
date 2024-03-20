import styled from "styled-components";
import modelBg from "../../assets/modelBg.png";
import SelectMethod from "../../components/voiceModel/beforeTrain/SelectMethod";

const Container = styled.div`
  background: url(${modelBg});
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  border-radius: 25px;
  background-color: rgba(214, 214, 214, 0.66);
  width: 65%;
  padding: 4rem 1rem;
  backdrop-filter: blur(.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .title {
    font-size: 1.875rem;
    color: white;
    font-family: 'GmarketSansBold';
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 65%;

    .subtitle {
      font-size: 1.3rem;
      color: white;
      padding-top: 0.4rem;
      font-family: 'GmarketSansBold';
    }
  }
`

function ModelDetailPage() {
  return (
    <Container>
      <Box>
        <h2 className="title">나만의 음성 모델 만들기</h2>
        <hr className="w-5/6" />
        <div className="step">
          <h3 className="subtitle">Step 3. 음성 업로드 방법 선택</h3>
        </div>
      </Box>
    </Container>
  )
}

export default ModelDetailPage;