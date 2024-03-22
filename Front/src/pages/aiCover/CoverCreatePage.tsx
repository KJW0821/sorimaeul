import { useNavigate } from "react-router"
import { CoverCreateInterface } from "../../components/aiCover/CoverInterface";
import { createCover } from "../../utils/coverAPI";
import { useState } from "react";
import CoverForm from "../../components/aiCover/CoverForm";

// 커버 컨텐츠 생성 페이지
const CoverCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CoverCreateInterface | null>(null);

  // 폼 제출 핸들러
  const handleSubmit = async (formData: CoverCreateInterface) => {
    try {
      // API 호출
      const data = await createCover(formData);
      setData(data);
      navigate(`/cover`);
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <>
      <CoverForm onSubmit={handleSubmit} />
    </>
  )
}

export default CoverCreatePage;