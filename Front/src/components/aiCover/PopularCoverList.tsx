import styled from 'styled-components';
import CDPlayer from "./CDPlayer";
import { CoverListInterface } from "./CoverInterface";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  width: 960px;
  height: 400px;
  padding: 80px 0; 
  gap: 20px;
  margin-left: auto;
  margin-right: auto;
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
        <div key={cover.coverCode} className="w-1/5 h-full"> 
          <CDPlayer cover={cover}/>
        </div>
      ))}
</ListContainer>
  );
};

export default CoverList;