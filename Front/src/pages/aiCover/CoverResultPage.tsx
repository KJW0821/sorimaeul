import { useParams } from "react-router-dom";
import CoverForm from "../../components/aiCover/CoverForm";
import { CoverUpdateInterface } from "../../components/aiCover/CoverInterface";
import { useEffect, useState } from "react";

// 커버 컨텐츠 생성 결과 확인 및 게시 상태 등록(수정) 페이지
const CoverResultPage:React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<CoverUpdateInterface | null>(null);

  return (
    <>
    <CoverForm isEdit={false}/>
    </>
  )
}

export default CoverResultPage;