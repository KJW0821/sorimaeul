import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CoverForm from "../../components/aiCover/CoverForm";
import { CoverUpdateInterface } from "../../components/aiCover/CoverInterface";
import { updateCover } from "../../utils/coverAPI";


const CoverResultPage: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<CoverUpdateInterface | null>(null);

  // 폼 제출 핸들러
  const handleSubmit = async (formData: CoverUpdateInterface) => {
    try {
      // API 호출
      if (params.id) {
        const data = await updateCover(params.id, formData);
        setData(data);
      }
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  return (
    <>
      <CoverForm isEdit={false} onSubmit={handleSubmit} />
    </>
  );
};

export default CoverResultPage;
