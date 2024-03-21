import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { CoverUpdateInterface } from "./CoverInterface";

interface Props {
  isEdit: boolean;
  initialData?: CoverUpdateInterface; 
  onSubmit: (data: CoverUpdateInterface) => void; 
}

const CoverForm: React.FC<Props> = ({ isEdit, initialData, onSubmit }) => { 
  const [data, setData] = useState<CoverUpdateInterface>({    
    coverName: "",
    coverDetail: "",
    thumbnailPath: "",
    isPublic: false,
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement  | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data); 
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="coverName">제목</label>
      <input type="text" id="coverName" name="coverName" value={data.coverName} onChange={handleChange} />
      <label htmlFor="coverDetail">내용</label>
      <textarea id="coverDetail" name="coverDetail" value={data.coverDetail} onChange={handleChange} cols={30} rows={10}></textarea>
      <label htmlFor="thumbnailPath">이미지 파일 경로</label>
      <input type="text" id="thumbnailPath" name="thumbnailPath" value={data.thumbnailPath} onChange={handleChange}/>
      <label htmlFor="isPublic">공개 여부</label>
      <select id="isPublic" name="isPublic" value={data.isPublic?.toString()} onChange={handleChange}>
        <option value="true">공개</option>
        <option value="false">비공개</option>
      </select>
      <Button $marginLeft={0} $marginTop={0} type="submit">{isEdit ? "수정" : "게시하기"}</Button>
      {isEdit && <button>삭제</button>}
    </form>
  );
}

export default CoverForm;