import styled from "styled-components";
import ColorLine from "../../components/inquiry/ColorLine";

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(90deg, rgba(253, 255, 0, 0.7) 0%, rgba(99, 218, 255, 0.7) 100%), #26BA28;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .description {
    font-size: 1.875rem;
    color: white;
    margin-left: 1.5rem;
  }
`

const Title = styled.h1`
  font-family: "ClimateCrisisKRVF";
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
  margin-left: 8rem;
`

function DubbingListPage() {
  return (
    <>
      <ColorBlock>
        <div className="flex items-end">
          <Title>더빙 극장</Title>
          <p className="description">영상을 선택한 후, 직접 더빙해보세요!</p>
        </div>
      </ColorBlock>
    </>
  )
}

export default DubbingListPage;