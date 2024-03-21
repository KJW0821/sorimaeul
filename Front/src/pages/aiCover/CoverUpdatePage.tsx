import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CoverUpdateInterface } from "../../components/aiCover/CoverInterface";


const CoverUpdatePage: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<CoverUpdateInterface>({
    coverName: "",
    coverDetail: "",
    thumbnailPath: "",
    isPublic: false,
  });

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