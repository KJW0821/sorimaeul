import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { CoverUpdateInterface } from "./CoverInterface";
import { requestS3 } from "../../utils/s3";

interface Props {
  isEdit: boolean;
  initialData?: CoverUpdateInterface; 
  onSubmit: (data: CoverUpdateInterface) => void; 
}
// 커버 게시 정보 설정 폼 
const CoverPostForm : React.FC<Props> = ({ isEdit, initialData, onSubmit }) => { 
  const [data, setData] = useState<CoverUpdateInterface>({    
    coverName: "",
    coverDetail: "",
    thumbnailPath: "",
    isPublic: true,
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''),
          file: file,
        });
        if (uploadedImageUrl) {
          setData({ ...data, thumbnailPath: uploadedImageUrl });
        } else {
          console.error("Error: Uploaded image URL is undefined");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };


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
      <label htmlFor="thumbnailPath">이미지 파일 업로드</label>
      <input type="file" onChange={handleImageUpload} />
      <label htmlFor="isPublic">공개 여부</label>
      <select id="isPublic" name="isPublic" value={data.isPublic?.toString()} onChange={handleChange}>
        <option value="true">공개</option>
        <option value="false">비공개</option>
      </select>
      <Button $marginLeft={0} $marginTop={0} type="submit"
      disabled={!data.coverName || !data.coverDetail }>{isEdit ? "수정" : "게시하기"}</Button>
      {isEdit && <button>삭제</button>}
    </form>
  );
}

export default CoverPostForm ;
