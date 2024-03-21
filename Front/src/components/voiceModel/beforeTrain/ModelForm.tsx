import styled from "styled-components";
import { Button } from "../../common/Button";
import * as voiceModelAPI from "../../../utils/voiceModelAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initModelInfo } from "../../../stores/voiceModel";
import { requestS3 } from "../../../utils/s3";

const Container = styled.div`
  border-radius: 25px;
  background-color: rgba(214, 214, 214, 0.66);
  width: 65%;
  padding: 4rem 1rem;
  backdrop-filter: blur(.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .title {
    font-size: 1.875rem;
    color: white;
    font-family: 'GmarketSansBold';
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 65%;

    .subtitle {
      font-size: 1.3rem;
      color: white;
      padding-top: 0.4rem;
      font-family: 'GmarketSansBold';
    }

    .input {
      border-radius: 5px;
      flex-grow: 1;
      height: 2.75rem;
      padding: 0 1rem;
      outline: none;
      background-color: white;
      color: #9F9F9F;
      display: flex;
      align-items: center;
    }

    label {
      display: inline-block;
      color: white;
      background-color: #7c87e3;
      cursor: pointer;
      height: 2.75rem;
      width: 3.45rem;
      border-radius: 5px;
      font-size: .875rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`

function ModelForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modelName, setModelName] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [selectedImagePath, setSelectedImagePath] = useState('');

  const data: voiceModelAPI.modelCreationData = {
    modelName,
    imagePath
  };

  const handleModelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(() => e.target.value);
  };

  const handleImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePath((reader.result as string));
      };
      reader.readAsDataURL(file);
      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''), 
          file: file,
        })
        if (uploadedImageUrl) {
          setImagePath(uploadedImageUrl);
        } else {
          console.error("Error: Uploaded image URL is undefined");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const submitHandler = async () => {
    const res = await voiceModelAPI.createModel(data);
    if (res?.status === 201) {
      console.log(res.data, '모델 생성 완료');
      dispatch(initModelInfo(res.data.modelCode));
      navigate(`/model/${res.data.modelCode}`);
    } else {
      console.log(res);
    }
  };

  return(
    <Container>
      <h2 className="title">나만의 음성 모델 만들기</h2>
      <hr className="w-5/6" />
      <div className="step">
        <h3 className="subtitle">Step 1. 이름 짓기</h3>
        <div className="flex items-center gap-2">
          <input onChange={handleModelName} className="input" type="text" placeholder="음성 모델명을 입력해주세요" />
        </div>
      </div>
      <div className="step">
        <h3 className="subtitle">Step 2. 썹네일 업로드</h3>
        <div className="flex items-center gap-2">
          <p className="input">{ imagePath ? imagePath : '음성 모델 썸네일을 업로드해주세요' }</p>
          <label htmlFor="file">업로드</label>
          <input onChange={handleImagePath} type="file" id="file" />
        </div>
      </div>
      <div className="w-5/6 flex">
        <Button onClick={submitHandler} $marginTop={1} $color="#7C87E3" $width={6} $height={2.75}>모델 등록</Button>
      </div>
    </Container>
  )
}

export default ModelForm;