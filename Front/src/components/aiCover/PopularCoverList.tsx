import CDPlayer from "./CDPlayer";
import { CoverListInterface } from "./CoverInterface";

interface Props {
  data: CoverListInterface['data'];
}
const CoverList: React.FC<Props> = ({
  data
}) => {
  return (
    <>
      {data.covers.map((cover) => (
        <CDPlayer key={cover.coverCode} cover={cover}/>
      ))}
    </>
  );
};

export default CoverList;