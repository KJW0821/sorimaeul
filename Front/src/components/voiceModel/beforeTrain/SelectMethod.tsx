import styled from "styled-components";
import SelectBox from "./SelectBox";
import SelfRecordMethod from "./SelfRecordMethod";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import UploadModelMethod from "./UploadModelMethod";

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
  const method = useSelector((state: RootState) => state.voiceModel.method);

  return (
    <Container>
      <SelectBox />
      <hr className="line" />
      {
        method === "self" &&
        <SelfRecordMethod />
      }
      {
        method === "file" &&
        <UploadModelMethod />
      }
    </Container>  
  )
}

export default SelectMethod;