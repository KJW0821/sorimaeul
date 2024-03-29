import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoverPostForm from "../../components/aiCover/CoverPostForm";
import { CoverUpdateInterface } from "../../components/aiCover/CoverInterface";
import { updateCover } from "../../utils/coverAPI";

// 커버 컨텐츠 결과 확인 및 게시 정보 설정 페이지
const CoverResultPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<CoverUpdateInterface | null>(null);

  // 폼 제출 핸들러
  const handleSubmit = async (formData: CoverUpdateInterface) => {
    try {
      // API 호출
      if (params.id) {
        const data = await updateCover(params.id, formData);
        setData(data);
        navigate(`/cover`);
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <>
      <CoverPostForm isEdit={false} onSubmit={handleSubmit} />
    </>
  );
};

export default CoverResultPage;
