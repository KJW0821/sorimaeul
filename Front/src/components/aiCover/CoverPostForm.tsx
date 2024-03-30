import React, { useState } from "react";
import { Cover, CoverResultInterface } from "./CoverInterface";
import { requestS3 } from "../../utils/s3";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import musicIcon from "../../assets/music.png";

const StyledContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 2rem auto;
  gap: 1rem;
  img {
      width: 35px;
      height: 35px;
      margin-top: 5px;
    }
`;

const Title = styled.h1`
  display: flex;
  gap: 10px;
  font-size: 2.25rem;
  font-family: 'GmarketSansBold';
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

const MediaSection = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 50px;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 23rem; 
  height: 23rem; 
  margin: 0 auto; 
  border-radius: 50%;
  overflow: hidden; 
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 6rem;
    height: 6rem;
    border-radius: 50%; 
    background-color: white; 
    z-index: 2; 
  }
`;

const Thumbnail = styled.img`
  width: 100%; 
  height: auto;
  display: block;
  position: relative;
  z-index: 1; 
`;

const InfoSection = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
`;


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 요소 사이의 간격
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  padding: 0.5rem;
  width: 87%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #EEEEEE;
  height: 200px;
`;

const Label = styled.label`
  font-size: 1.5rem;
  color: #000;
  
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: .2rem;
  background: white;
  color: #797979;
  width: 4.6rem;
  font-size: 1.125rem;
  height: 2rem;
  border: 1px solid #797979;
  border-radius: 5px;

  .icon {
    height: 100%;
  }

  p {
    padding-top: .2rem;
  }
`
const ButtonBox = styled.div`
    display: flex;
    gap: .5rem;
    justify-content: flex-end;
    margin-right: 220px;
    .icon {
      height: 80%;
    }
`;


interface Props {
  initialData?: CoverResultInterface | null;
  onSubmit: (data: CoverResultInterface) => void;
}
// 커버 게시 정보 설정 폼 
interface Props {
  initialData?: CoverResultInterface | null;
  onSubmit: (data: CoverResultInterface) => void;
}

const CoverPostForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [data, setData] = useState<CoverResultInterface>(initialData || {
    coverName: '',
    coverDetail: '',
    thumbnailPath: '',
    storagePath: '',
    coverSinger: '',
    singer: '',
    title: '',
    public: false
  });
  const baseURL = "https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com";
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data,[name]: name === "public" ? value === "true" : value});
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  }

  console.log(data);
  return (
    <StyledContainer>
      <ContentContainer>
        <MediaSection>
          <ThumbnailContainer>
            <Thumbnail src={`${baseURL}${data.thumbnailPath}`} alt="cover thumbnail" />
          </ThumbnailContainer>
          <div>
            {data.storagePath && (
              <audio src={data.storagePath} controls></audio>
            )}
          </div>
        </MediaSection>
        <InfoSection>
          <StyledForm onSubmit={submitHandler}>
            <Title><img src={musicIcon} alt="music icon" />AI 커버 확인</Title>
            <FormRow>
              <Label htmlFor="coverName">제목:</Label>
              <InputField type="text" id="coverName" name="coverName" value={data.coverName} placeholder="커버 게시 제목을 입력해주세요" onChange={handleChange} />
            </FormRow>
            <TextArea id="coverDetail" name="coverDetail" value={data.coverDetail} placeholder="커버에 대한 설명을 입력해주세요" onChange={handleChange} cols={30} rows={10}></TextArea>
            <Label htmlFor="thumbnailPath">이미지 파일 업로드</Label>
            <input type="file" onChange={handleImageUpload} />
            <Label htmlFor="isPublic">공개 여부</Label>
            <select  id="public" name="public" value={String(data.public)} onChange={handleChange}>
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
            <Button type="submit" disabled={!data.coverName || !data.coverDetail}>설정</Button>
          </StyledForm>
        </InfoSection>
      </ContentContainer>
    </StyledContainer>
  );
}

export default CoverPostForm;
