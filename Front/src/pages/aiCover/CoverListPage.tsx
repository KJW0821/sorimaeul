import { useEffect, useState } from "react";
import { CoverListInterface } from "../../components/aiCover/CoverInterface";
import { getCovers, getPopularCovers } from "../../utils/coverAPI";
import CoverList from "../../components/aiCover/CoverList";
import ColorLine from "../../components/aiCover/ColorLine";
import PopularCoverList from "../../components/aiCover/PopularCoverList";

const CoverListPage: React.FC = () => {
  const [dataList, setDataList] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });
  const [popularDataList, setPopularDataList ] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });

  useEffect(() => {
    (async () => {
      try {
        const data = await getCovers();
        setDataList({
          covers: data.covers,
          totalPages: data.totalPages
        });

        const popularData = await getPopularCovers();
        setPopularDataList({
          covers: popularData.covers,
          totalPages: popularData.totalPages
        });
      } catch (error) {
        console.error("커버 데이터를 가져오는데 실패했습니다.");
      }
    }) ();
  }, []);

  return (
    <>
    <ColorLine />
    <PopularCoverList data={ popularDataList }/>
    <CoverList data={ dataList } />
    </>
  );
};

export default CoverListPage;