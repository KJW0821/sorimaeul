import { useEffect, useState } from "react";
import { CoverCreateInterface, CoverModelInterface } from "./CoverInterface"
import { getCoverModels } from "../../utils/coverAPI";
import { Button } from "../common/Button";
import styled from "styled-components";

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

  useEffect(() => {
    (async () => {
      try {
        const models = await getCoverModels();
        setModels(models);
      } catch (err) {
        console.error("음성 모델 데이터를 가져오는데 실패했습니다.");
      }    
    }) ();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <h2>AI 커버 만들기</h2>
      <h3>Step 1. 노래 업로드</h3>
      <div>
        <label htmlFor="youtubeLinlk">원하는 노래의 유튜브 링크를 입력해주세요.</label>
        <Input type="text" id="youtubeLink" name="youtubeLink" value={data.youtubeLink} onChange={handleChange} />
      </div>
      <h3>Step 2. 원곡 정보 입력</h3>
      <div>
        <label htmlFor="singer">원곡 가수명</label>
        <Input type="text" id="singer" name="singer" value={data.singer} onChange={handleChange} />
        <label htmlFor="title">원곡 제목</label>
        <Input type="text" id="title" name="title" value={data.title} onChange={handleChange} />
      </div>
      <h3>Step 3. 모델 선택하기</h3>
      <div>
        <label htmlFor="modelCode">원하는 음성 모델을 선택하고, 알맞게 피치를 조절해주세요.</label>
        <Select name="modelCode" id="modelCode" value={data.modelCode} onChange={handleChange}>
          <option value=""> 모델을 선택해주세요. </option>
          {models.voiceModels.map((model) => (
            <option key={model.modelCode} value={model.modelCode}>
              {model.modelCode} 
              {model.modelName}
              {model.userCode}
            </option>
          ) )}
        </Select>
        <label htmlFor="pitch">피치 조절</label>
        <Select name="pitch" id="pitch" value={data.pitch} onChange={handleChange}>
          {[...Array(25).keys()].map(i => (
            <option key={i} value={i - 12}>{i - 12}</option>
          ))}
        </Select>
      </div>
      <h3>Step 4. 커버 이름 정하기</h3>
      <div>
        <Input type="text" id="coverName" name="coverName" value={data.coverName} onChange={handleChange} />
      </div>
      <Button $marginLeft={0} $marginTop={0} type="submit" 
      disabled={!data.youtubeLink || !data.singer || !data.title || data.modelCode === 0 || !data.coverName}>변환하기</Button>
    </form>
  )
}

export default CoverForm;