import styled from "styled-components";

const Container = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  padding: 0 2rem;

  label {
    font-size: 1rem;
    font-family: 'GmarketSansBold';
    padding-top: .25rem;
  }
  input[type="radio"] {
    vertical-align: middle;
    appearance: none;
    border: max(1px, 0.2rem) solid white;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    background-color: white;

  }
  input[type="radio"]:checked {
    background-color: #AC69FF;
  }
`

function SelectBox() {
  return (
    <Container>
      <div className="flex items-center gap-1">
        <input type="radio" id="self" name="method" />
        <label>직접 녹음하기</label>
      </div>
      <div className="flex items-center gap-1">
        <input type="radio" id="file" name="method" />
        <label>녹음본 업로드</label>
      </div>
      <div className="flex items-center gap-1">
        <input type="radio" id="model" name="method" />
        <label>외부 학습 모델</label>
      </div>
    </Container>
  )
}

export default SelectBox;