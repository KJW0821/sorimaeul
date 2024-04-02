import styled from 'styled-components';
import CoverCard from './CoverCard';
import { Cover } from './CoverInterface';

interface Props {
  data: Cover[];
}

const CardContainer = styled.div`
  width: 18%;
  height: 400px;
`;

const CoverList: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((cover) => (
          <CardContainer>
            <CoverCard key={cover.coverCode} cover={cover} />
          </CardContainer>
        ))}
    </>
  );
};

export default CoverList;
