import CoverCard from "./CoverCard";
import { Cover } from "./CoverInterface"

interface Props {
  data: Cover[];
}
const CoverList: React.FC<Props> = ({
  data
}) => {
  return (
    <>
      {data && data.map((cover) => (
        <CoverCard key={cover.coverCode} cover={cover}/>
      ))}
    </>
  );
};

export default CoverList;