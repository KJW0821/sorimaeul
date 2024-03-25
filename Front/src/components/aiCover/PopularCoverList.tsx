import styled from 'styled-components';
import CDPlayer from "./CDPlayer";
import { CoverListInterface } from "./CoverInterface";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; // 여기를 수정하세요
  overflow-x: auto; // 필요한 경우 스크롤바 추가
`;

const ListItem = styled.div`
  margin-right: 10px; // 각 아이템 간의 간격 조정
`;

interface Props {
  data: CoverListInterface['data'];
}
const CoverList: React.FC<Props> = ({
  data
}) => {
  return (
<ListContainer>
      {data.covers.map((cover) => (
        <div key={cover.coverCode} className="mr-2"> 
          <CDPlayer cover={cover}/>
        </div>
      ))}
</ListContainer>
  );
};

export default CoverList;