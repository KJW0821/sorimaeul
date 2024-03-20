import CoverCard from "./CoverCard";
import { CoverListInterface } from "./CoverInterface"

interface Props {
  data: CoverListInterface['data'];
}
const CoverList: React.FC<Props> = ({
  data
}) => {
  return (
    <>
      {data.covers.map((cover) => (
        <CoverCard key={cover.coverCode} cover={cover}/>
      ))}
    </>
  );
};

export default CoverList;