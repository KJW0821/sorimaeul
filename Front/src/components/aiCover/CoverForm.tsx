import { useEffect, useState } from "react";
import { CoverCreateInterface, CoverModelInterface, SongInterface } from "./CoverInterface"
import { getCoverModels } from "../../utils/coverAPI";
import { Button } from "../common/Button";
import styled from "styled-components";
import DirectUpload from "./DirectUpload";
import Recommendation from "./Recommendation";

interface Props {
  onSubmit: (data: CoverCreateInterface) => void;
}

const Input = styled.input`
  border: 1px solid #ccc; /* 기본 테두리 색상 */
  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 */
  }
`;

const Select = styled.select`
  border: 1px solid #ccc; /* 기본 테두리 색상 */
  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 */
  }
`;

const CoverForm: React.FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<CoverCreateInterface>({
    youtubeLink: "",
    singer: "",
    title: "",
    modelCode: 0,
    pitch: 0,
    coverName: "",
  })
  const [models, setModels] = useState<CoverModelInterface>({ voiceModels: [] });
  const [uploadType, setUploadType] = useState<string>("direct");
  const baseStepNumber = uploadType === "recommendation" ? 1 : 2;
  const [youtubeLink, setYoutubeLink] = useState("");

  // data 상태 확인을 위한 출력 코드 - 추후 제거 필요
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        const modelData = await getCoverModels();
        setModels(modelData);
      } catch (err) {
        console.error("음성 모델 데이터를 가져오는데 실패했습니다.");
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data)
  }

  const handleUploadType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadType(e.target.value);
  };

  const handleDirectLink = (link: string) => {
    setData(prevData => ({
      ...prevData,
      youtubeLink: link
    }));
    setYoutubeLink(link);
    console.log("direct 링크 받음", link);
  };

  const handleSongSelect = (song: SongInterface) => {
    const { coverSourceCode, singer, title, youtubeLink, thumbnailPath } = song;
    console.log("노래 선택 링크 받음", youtubeLink);
    setData(prevData => ({
      ...prevData,
      singer: singer,
      title: title,
      youtubeLink: youtubeLink
    }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  }

  // 유튜브 유효성 검사 
  const isValidYoutubeLink = (url : string) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };
  
  return (
    <form onSubmit={submitHandler}>
      <h2>AI 커버 만들기</h2>
      <h3>Step 1. 노래 업로드</h3>
      <div>
        <label>
          <input
            type="radio"
            name="uploadType"
            value="direct"
            checked={uploadType === 'direct'}
            onChange={handleUploadType}
          />
          직접 유튜브 링크 입력
        
        </label>
        <label>
          <input
            type="radio"
            name="uploadType"
            value="recommendation"
            checked={uploadType === 'recommendation'}
            onChange={handleUploadType}
          />
          추천 목록에서 선택
        </label>
      </div>
      {uploadType === "direct" && (
        <>
          <DirectUpload  link={youtubeLink} onLinkChange={handleDirectLink} />
          <h3>Step 2. 원곡 정보 입력</h3>
          <div>
            <label htmlFor="singer">원곡 가수명</label>
            <Input type="text" id="singer" name="singer" value={data.singer} onChange={handleChange} />
            <label htmlFor="title">원곡 제목</label>
            <Input type="text" id="title" name="title" value={data.title} onChange={handleChange} />
          </div>
        </>
      )
      }
      {uploadType === 'recommendation' && (
        <Recommendation onSongSelect={handleSongSelect} />
      )
      }



      <h3>Step {baseStepNumber + 1}. 모델 선택하기</h3>
      <div>
        <label htmlFor="modelCode">원하는 음성 모델을 선택하고, 알맞게 피치를 조절해주세요.</label>
        <Select name="modelCode" id="modelCode" value={data.modelCode} onChange={handleChange}>
          <option value=""> 모델을 선택해주세요. </option>
          {models.voiceModels.map((model) => (
            <option key={model.modelCode} value={model.modelCode}>
              {model.modelName}
            </option>
          ))}
        </Select>
        <label htmlFor="pitch">피치 조절</label>
        <Select name="pitch" id="pitch" value={data.pitch} onChange={handleChange}>
          {[...Array(25).keys()].map(i => (
            <option key={i} value={i - 12}>{i - 12}</option>
          ))}
        </Select>
      </div>
      <h3>Step {baseStepNumber + 2}. 커버 이름 정하기</h3>
      <div>
        <Input type="text" id="coverName" name="coverName" value={data.coverName} onChange={handleChange} />
      </div>
      <Button $marginLeft={0} $marginTop={0} type="submit"
        disabled={
          !isValidYoutubeLink(data.youtubeLink) ||!data.youtubeLink || !data.singer || !data.title || data.modelCode === 0 || !data.coverName}>변환하기</Button>


    </form>
  )
}

export default CoverForm;