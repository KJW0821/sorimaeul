import styled from "styled-components";
import SelectBox from "./SelectBox";
import SelfRecordMethod from "./SelfRecordMethod";

const Container = styled.div`
  border-radius: 35px;
  padding: 2rem 2rem;
  background-color: black;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .line {
    border-color: #AC69FF;
  }
`

function SelectMethod() {
  return (
    <Container>
      <SelectBox />
      <hr className="line" />
      <SelfRecordMethod />
    </Container>  
  )
}

export default SelectMethod;