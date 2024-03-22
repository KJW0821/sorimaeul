import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { CoverUpdateInterface } from "../../components/aiCover/CoverInterface";
import { getCover, updateCover } from "../../utils/coverAPI";
import CoverPostForm from "../../components/aiCover/CoverPostForm";


const CoverUpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<CoverUpdateInterface | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          // 게시글 정보 불러오기
          const data = await getCover(params.id);
          setData(data);
        }
      } catch (error) {
        console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
      }
    }) ();
  }, [params.id]);

  const handleSubmit = async (formData: CoverUpdateInterface) => {
    try {
      if (params.id) {
        // 수정 요청
        const data = await updateCover(params.id, formData);
        setData(data);
        navigate(`/cover/${params.id}`);
      }
    } catch (err) {
      console.error(err); 
    }
  };

  return (
    <>
      {data && <CoverPostForm isEdit={true} initialData={data} onSubmit={handleSubmit}></CoverPostForm>}
    </>
  )
}

export default CoverUpdatePage;