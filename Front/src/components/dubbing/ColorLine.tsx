import styled from "styled-components";
import backBtn from "../../assets/backBtn.png";

const ColorBlock = styled.div`
  width: 100%;
  height: 7.2rem;
  background: linear-gradient(90deg, rgba(253, 255, 0, 0.7) 0%, rgba(99, 218, 255, 0.7) 100%), #26BA28;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;

  .back {
    margin-right: 4rem;
  }
`

function ColorLine() {
  return (
    <ColorBlock>
      <img className="back" src={backBtn} alt="backButton" />
    </ColorBlock>
  )
}

export default ColorLine;