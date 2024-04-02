import React, { useState } from "react";
import { Cover, CoverResultInterface } from "./CoverInterface";
import { requestS3 } from "../../utils/s3";
import { styled } from "styled-components";
import musicIcon from "../../assets/music.png";
import ColorLine from "./ColorLine";
import { s3URL } from "../../utils/s3";
import deleteIcon from "../../assets/deleteIcon.png";
import coverImg from "../../assets/coverImg.jpg";
import { deleteCover } from "../../utils/coverAPI";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../common/ToggleButton";

const StyledContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 2rem auto;
  gap: 1rem;
`;

const Icon = styled.img`
width: 35px;
height: 35px;
margin-top: 5px;
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
  background: ${({ disabled }) => (disabled ? '#f0f0f0' : 'white')};
  color: #797979;
  width: 4.6rem;
  font-size: 1.125rem;
  height: 2rem;
  border: 1px solid ${({ disabled }) => (disabled ? '#d3d3d3' : '#797979')};
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

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
  const navigate = useNavigate();
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [data, setData] = useState<CoverResultInterface>(initialData || {
    coverCode: '',
    coverName: '',
    coverDetail: '',
    thumbnailPath: '/image/coverImg.jpg',
    storagePath: '',
    coverSinger: '',
    singer: '',
    title: '',
    isPublic: false
  });
  const [isPublic, setIsPublic] = useState(data.isPublic);

  const handleImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePath(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''),
          file: file,
        });

        setData({ ...data, thumbnailPath: uploadedImageUrl });
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };
  
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (data.coverCode) {
        await deleteCover(data.coverCode);
        // 삭제 후 이전 페이지로 이동 : 마이페이지 - 커버 확인 페이지로 
        navigate(-1);
        console.log("삭제 성공");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      ...data,
      isPublic, 
    };
    onSubmit(formData);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement; // 타입 단언 사용

    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
  
    if (target.type === 'checkbox' && name === 'isPublic') {
      setIsPublic(target.checked);
    } else {
      setData({ ...data, [name]: value });
    }
  };

  return (
    <>
    <ColorLine />
    <StyledContainer>
      <ContentContainer>
        <MediaSection>
          
            {/* 이미지 존재 여부에 따른 처리 */}
            <label htmlFor="file" className="cursor-pointer">
              <ThumbnailContainer>
            {selectedImagePath ? (
              <Thumbnail src={selectedImagePath}/>
            ) : (
              <Thumbnail src={s3URL + data.thumbnailPath} />
            )}
            </ThumbnailContainer>
            </label>
            <input type="file" id="file" accept="image/*" onChange={handleImagePath} className="hidden" />
            {data.storagePath && (
              <audio className="mt-10" src={s3URL + data.storagePath} controls></audio>
            )}

        </MediaSection>
        <InfoSection>
          <StyledForm onSubmit={submitHandler}>
            <Title><Icon src={musicIcon} alt="music icon" />AI 커버 확인</Title>
            <FormRow>
              <Label htmlFor="coverName">제목:</Label>
              <InputField type="text" id="coverName" name="coverName" value={data.coverName} placeholder="커버 게시 제목을 입력해주세요" onChange={handleChange} />
            </FormRow>
            <TextArea id="coverDetail" name="coverDetail" value={data.coverDetail} placeholder="커버에 대한 설명을 입력해주세요" onChange={handleChange} cols={30} rows={10}></TextArea>
            
            <div className="button-box">
            <div className="flex gap-2">
              <p className="is-public">공개여부</p>
              <ToggleButton isPublic={isPublic} setIsPublic={setIsPublic} color="#C9F647" />
            </div>
            </div>
            <Button type="submit" disabled={!data.coverName || !data.coverDetail}>설정</Button>
            <Button onClick={handleDelete}>
            <img className="icon" src={deleteIcon} alt="delete icon" />
            <p>삭제</p>
          </Button>
          </StyledForm>
        </InfoSection>
      </ContentContainer>
    </StyledContainer>
    </>
  );
}

export default CoverPostForm;
