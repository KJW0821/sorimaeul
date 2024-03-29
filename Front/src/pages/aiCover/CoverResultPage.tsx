import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoverPostForm from "../../components/aiCover/CoverPostForm";
import { CoverUpdateInterface } from "../../components/aiCover/CoverInterface";
import { getCover, updateCover } from "../../utils/coverAPI";
import CoverConverting from "../../components/aiCover/CoverConverting";

// 커버 컨텐츠 결과 확인 및 게시 정보 설정 페이지
const CoverResultPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<CoverUpdateInterface | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const coverCode = params.id;

  // 변환 완료 여부 확인 
  useEffect(() => {
    (async () => {
      try {
        if (coverCode) {
          const res = await getCover(coverCode);
          setIsCompleted(res.complete);
          console.log("학습 완료 여부", res.complete);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

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
    {isCompleted ?
    <CoverPostForm isEdit={false} onSubmit={handleSubmit}/>
      : <CoverConverting />
     }

    </>
  );
};

export default CoverResultPage;
