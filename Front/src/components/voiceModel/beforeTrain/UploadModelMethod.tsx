import styled from "styled-components";
import uploadFile from "../../../assets/uploadFile.png";

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
  .file-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background-color: #8F8F8F;
    gap: 1rem;
  }
`

function UploadModelMethod() {
  return(
    <Container>
      <div className="guide">
        <p>이미 녹음된 음성 파일을 모델 학습에 이용합니다.</p>
        <p>최소 1시간 이상의 분량이 권장됩니다.</p>
        <p>(녹음본 분량이 커질수록 학습에 용이합니다.)</p>
      </div>
      <div className="file-controller">
        <img src={uploadFile} alt="uploadFile" />
        <p>wav 파일이 권장됩니다.</p>
      </div>
    </Container>
  )
}

export default UploadModelMethod;