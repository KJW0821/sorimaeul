import { useEffect } from "react";
import { useParams } from "react-router-dom"


const CoverUpdatePage: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          // 게시글 정보 불러오기
        }
      } catch (error) {
        console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
      }
    }) ();
  }, [params.id]);

  return (
    <>
    </>
  )
}

export default CoverUpdatePage;