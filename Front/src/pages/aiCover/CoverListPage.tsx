import { useEffect, useState } from "react";
import { CoverListInterface } from "../../components/aiCover/CoverInterface";
import { getCovers, getPopularCovers } from "../../utils/coverAPI";
import CoverList from "../../components/aiCover/CoverList";
import ColorLine from "../../components/aiCover/ColorLine";
import PopularCoverList from "../../components/aiCover/PopularCoverList";
import { useNavigate } from "react-router";
import { Button } from "../../components/common/Button";

const CoverListPage: React.FC = () => {
  const navigate = useNavigate();
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
    <Button onClick={() => navigate("/cover/create") } $marginLeft={0} $marginTop={0}>나만의 커버 만들기</Button>
    <PopularCoverList data={ popularDataList }/>
    <CoverList data={ dataList } />
    </>
  );
};

export default CoverListPage;