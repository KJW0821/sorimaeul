import { useState } from "react";
import { useNavigate } from "react-router"
import { createCover } from "../../utils/coverAPI";
import { CoverCreateInterface } from "../../components/aiCover/CoverInterface";
import CoverForm from "../../components/aiCover/CoverForm";


// 커버 컨텐츠 생성 페이지
const CoverCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 제출 방지용

  // 폼 제출 핸들러
  const handleSubmit = async (formData: CoverCreateInterface) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // API 호출
      const response = await createCover(formData);
      console.log("생성 성공");
      console.log("response", response);

    } catch (error) {
      console.error(error); // 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CoverForm onSubmit={handleSubmit} />
    </>
  )
}

export default CoverCreatePage;