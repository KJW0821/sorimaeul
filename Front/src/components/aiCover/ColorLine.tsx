import styled from "styled-components";

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(90deg, rgba(225, 165, 255, 0.5) 0%, rgba(229, 151, 249, 0.5) 12.97%, rgba(255, 55, 211, 0.5) 100%), #FDFF00;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: "ClimateCrisisKRVF";
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
  margin-left: 8rem;
`

function ColorLine() {
  return (
    <ColorBlock>
      <Title>AI 노래방</Title>
    </ColorBlock>
  )
}

export default ColorLine;