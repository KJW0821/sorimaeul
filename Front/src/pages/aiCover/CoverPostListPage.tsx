import { useEffect, useState } from "react";
import { CoverListInterface } from "../../components/aiCover/CoverInterface";
import { getCovers } from "../../utils/coverAPI";
import CoverList from "../../components/aiCover/CoverList";

const CoverListPage: React.FC = () => {
  const [dataList, setDataList] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });

  useEffect(() => {
    (async () => {
      try {
        const data = await getCovers();
        setDataList({
          covers: data.covers,
          totalPages: data.totalPages
        });
      } catch (error) {
        console.error("커버 데이터를 가져오는데 실패했습니다.");
      }
    }) ();
  }, []);

  return (
    <>
    <CoverList data={ dataList } />
    </>
  );
};

export default CoverListPage;