import { useEffect, useState } from "react";
import { CoverCreateInterface, CoverModelInterface, SongInterface } from "./CoverInterface"
import { getCoverModels } from "../../utils/coverAPI";
import { Button } from "../common/Button";
import styled from "styled-components";
import DirectUpload from "./DirectUpload";
import Recommendation from "./Recommendation";


const Container = styled.form`
  border-radius: 25px;
  background-color: rgba(214, 214, 214, 0.66);
  width: 65%;
  padding: 4rem 1rem;
  backdrop-filter: blur(.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  .title {
    font-size: 1.875rem;
    color: white;
    font-family: 'GmarketSansBold';
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: 65%;

  .subtitle {
    font-size: 1.3rem;
    color: white;
    padding-top: 0.4rem;
    font-family: 'GmarketSansBold';
  };

  .thirdtitle {
    font-size: 1rem;
    color: #78716c; 

  }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; 
  color: #78716c; 
  font-size: 1.24rem;

  .label {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

`;

const Input = styled.input`
  border-radius: 5px;
  flex-grow: 1;
  height: 2.75rem;
  padding: 0 1rem;
  outline: none;
  background-color: white;
  color: #9F9F9F;
  display: flex;
  align-items: center;

`;

const Select = styled.select`
    border: 1px solid #ccc; 
  &:focus {
    border-color: #FE9D6A;
  }
`;


interface Props {
  onSubmit: (data: CoverCreateInterface) => void;
}

const CoverForm: React.FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<CoverCreateInterface>({
    youtubeLink: "",
    singer: "",
    title: "",
    modelCode: "",
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
    const newUploadType = e.target.value;
    setUploadType(newUploadType);

    setData({
      ...data,
      youtubeLink: "",
      singer: "",
      title: "",
      coverName: "",
    })

    if(newUploadType === "direct") {
      setYoutubeLink("");
    }
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
    <Container onSubmit={submitHandler}>
      <h2 className="title">AI 커버 만들기</h2>
      <hr className="w-5/6" />
      <Step>
        <h3 className="subtitle">Step 1. 노래 업로드</h3></Step>
     
      <div className="flex items-center gap-2">
        <RadioGroup>
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
        </RadioGroup>
      </div>
      
      {uploadType === "direct" && (
        <>
          <DirectUpload  link={youtubeLink} onLinkChange={handleDirectLink} />
          <Step>
            
          <h3 className="subtitle">Step 2. 원곡 정보 입력</h3>
          <div>
            <label htmlFor="singer" className="thirdtitle">원곡 가수명</label>
            <Input type="text" id="singer" name="singer" value={data.singer} onChange={handleChange} />
            <label htmlFor="title"  className="thirdtitle">원곡 제목</label>
            <Input type="text" id="title" name="title" value={data.title} onChange={handleChange} />
          </div>
          </Step>

        </>
      )
      }
      {uploadType === 'recommendation' && (
        <Recommendation onSongSelect={handleSongSelect} />
      )
      }



      <Step>
      <h3 className="subtitle">Step {baseStepNumber + 1}. 모델 선택하기</h3>
      <label className="thirdtitle" htmlFor="modelCode" >원하는 음성 모델을 선택하고, 알맞게 피치를 조절해주세요.</label>
        <Select name="modelCode" id="modelCode" value={data.modelCode} onChange={handleChange}>
          <option value="" > 모델을 선택해주세요. </option>
          {models && models?.voiceModels.map((model) => (
            <option key={model.modelCode} value={model.modelCode}>
              {model.modelName}
            </option>
          ))}
        </Select>
        <label className="text-stone-500" htmlFor="pitch">피치 조절</label>
        <Select name="pitch" id="pitch" value={data.pitch} onChange={handleChange}>
          {[...Array(25).keys()].map(i => (
            <option key={i} value={i - 12}>{i - 12}</option>
          ))}
        </Select>
      </Step>
      


      
      <Step>
      <h3 className="subtitle">Step {baseStepNumber + 2}. 커버 이름 정하기</h3>
      <Input type="text" id="coverName" name="coverName" value={data.coverName} onChange={handleChange} />
      </Step>

      <div className="w-5/6 flex">
      <Button $marginTop={2} $color="#FE9D6A" $width={10} $height={3} type="submit"
        disabled={
          !isValidYoutubeLink(data.youtubeLink) ||!data.youtubeLink || !data.singer || !data.title || data.modelCode === "" || !data.coverName}>변환하기</Button>
      </div>
      


    </Container>
  )
}

export default CoverForm;