import styled from 'styled-components';
import CDPlayer from "./CDPlayer";
import { Cover } from "./CoverInterface";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 75%;
  gap: 3rem;
  margin-left: 16rem;
`;



interface Props {
  data: Cover[];
}
const PopularCoverList: React.FC<Props> = ({
  data
}) => {
  return (
<ListContainer>
      {data && data.map((cover) => (
        <div key={cover.coverCode} className="w-1/5 h-full"> 
          <CDPlayer cover={cover}/>
        </div>
      ))}
</ListContainer>
  );
};

export default PopularCoverList;