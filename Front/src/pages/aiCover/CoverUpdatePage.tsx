import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { CoverDetailInterface, CoverUpdateInterface } from "../../components/aiCover/CoverInterface";
import { getCover, updateCover } from "../../utils/coverAPI";
import CoverForm from "../../components/aiCover/CoverForm";


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
      // API 호출
      if (params.id) {
        const data = await updateCover(params.id, formData);
        setData(data);
        navigate(`/cover/${params.id}`);
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <>
      {data && <CoverForm isEdit={true} initialData={data} onSubmit={handleSubmit}></CoverForm>}
    </>
  )
}

export default CoverUpdatePage;