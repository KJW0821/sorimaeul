import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCover } from "../../utils/coverAPI";
import { CoverDetailInterface } from "../../components/aiCover/CoverInterface";

const CoverDetailPage: React.FC = () => {

  const params = useParams();
  const [data, setData] = useState<CoverDetailInterface | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          const data = await getCover(params.id);
          setData(data);
        }
      } catch (err) {
        console.error("커버 데이터를 가져오는데 실패했습니다.");
      }
    })();
  }, [params.id]);
  return (
    <>
      {data &&
        <div>
          <h2> 커버 제목(게시물) {data.coverName} </h2>
          <h2> 커버 내용(게시물) {data.coverDetail} </h2>
          <h2> 음원 저장 경로 {data.storagePath} </h2>
          <h2> 원곡명 {data.title} </h2>
          <h2> 좋아여 수{data.likeCount}</h2>
          <h2> 커버 가수명 {data.coverSinger} </h2>
          <h2> 썸네일 {data.thumbnailPath} </h2>
          <h2>오리지널 가수{data.singer}</h2>
          <h2> 작성자 닉네임 {data.nickname} </h2>
          <h2> 좋아요 여부 {data.isLiked} </h2>
        </div>
      }

    </>
  );
};

export default CoverDetailPage;