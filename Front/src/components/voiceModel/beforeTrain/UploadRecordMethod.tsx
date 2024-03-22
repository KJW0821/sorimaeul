import styled from "styled-components";
import uploadFile from "../../../assets/uploadFile.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsFileUploaded } from "../../../stores/voiceModel";

const Container = styled.div<{ $isUploaded: boolean }>`
  width: 100%;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .guide {
    font-size: 0.875rem;
  }
  .file-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 8.5rem;
    background-color: #8F8F8F;
    gap: 1rem;
    position: relative;

    .name {
      font-size: .875rem;
      font-family: 'GmarketSansLight';
    }

    .delete-btn {
      cursor: pointer;
    }

    label {
      cursor: pointer;
      width: 100%;
      height: ${(props) => props.$isUploaded ? '75%' : '100%'};
      position: absolute;
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

interface FileData {
  file: File
}

function UploadRecordMethod() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<FileData[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFiles = Array.from(e.target.files);
      const changedFiles = uploadFiles.map(el => {
        return {file: el}
      })
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...changedFiles];
        return newFiles;
      });
    }
  }

  const deleteFile = (idx: number) => {
    const changedFiles = [...files];
    changedFiles.splice(idx, 1);
    setFiles(changedFiles);
  };

  useEffect(() => {
    if (files.length) {
      dispatch(setIsFileUploaded(true));
    } else {
      dispatch(setIsFileUploaded(false));
    }
  }, [files])

  return(
    <Container $isUploaded={files.length > 0}>
      <div className="guide">
        <p>이미 녹음된 음성 파일을 모델 학습에 이용합니다.</p>
        <p>최소 1시간 이상의 분량이 권장됩니다.</p>
        <p>(녹음본 분량이 커질수록 학습에 용이합니다.)</p>
      </div>
      <div className="file-controller">
        {
          files.length > 0 ?
          <div className="w-full h-full flex flex-col p-4 gap-2">
            <div className="flex flex-col h-3/4 overflow-auto gap-2">
              {
                files.map((el, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <p className="name">{el.file.name}</p>
                    <p className="delete-btn" onClick={() => deleteFile(idx)}>x</p>
                  </div>
                ))
              }
            </div>
            <div>
              <label htmlFor="files">+ 파일 추가</label>
              <input onChange={handleFiles} type="file" id="files" name="files" accept="audio/wav" multiple />
            </div>
          </div>
          :
          <>
            <img src={uploadFile} alt="uploadFile" />
            <p>wav 파일이 권장됩니다.</p>
            <label htmlFor="files"></label>
            <input onChange={handleFiles} type="file" id="files" name="files" accept="audio/wav" multiple />
          </>
        }
      </div>
    </Container>
  )
}

export default UploadRecordMethod;