import styled from 'styled-components';
import CDPlayer from "./CDPlayer";
import { CoverListInterface } from "./CoverInterface";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; 
  overflow-x: auto; 
  justify-content: center; 
  width: 100%; 
  padding: 20px 0; 
  gap: 20px;
`;


interface Props {
  data: CoverListInterface['data'];
}
const CoverList: React.FC<Props> = ({
  data
}) => {
  return (
<ListContainer>
      {data.covers?.map((cover) => (
        <div key={cover.coverCode} className="mr-2"> 
          <CDPlayer cover={cover}/>
        </div>
      ))}
</ListContainer>
  );
};

export default CoverList;