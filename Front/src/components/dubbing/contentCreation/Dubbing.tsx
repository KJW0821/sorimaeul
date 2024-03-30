import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOriginVoices } from "../../../utils/dubbingAPI";
import { getVoiceModels } from "../../../utils/voiceModelAPI";
import { s3URL } from "../../../utils/s3";
import startRecordBtn from "../../../assets/startRecordBtn.png";
import stopRecordBtn from "../../../assets/stopRecordBtn.png";
import reRecordBtn from "../../../assets/reRecordBtn.png";
import playRecordBtn from "../../../assets/playRecordBtn.png";
import Select from "react-select";
import { Button } from "../../common/Button";

const Container = styled.div`
  width: 90%;
`

interface VoiceData {
  videoSourceCode: number;
  voicePath: string;
  voiceIndex: number;
  voiceName: string;
}

interface ModelData {
  modelCode: number;
  modelName: string;
  state: number;
  existSource: boolean;
}

function Dubbing() {
  const params = useParams();
  const navigate = useNavigate();

  const [videoPath, setVideoPath] = useState('');
  const [originVoiceList, setOriginVoiceList] = useState<VoiceData[]>([]);
  const [modelList, setModelList] = useState<ModelData[]>([]);
  const [modelInput, setModelInput] = useState<{ value: number, label: string }[]>([]);
  const [voicePaths, setVoicePaths] = useState<string[]>([]);
  const [recordState, setRecordState] = useState<number[]>([]); // 0: 녹음 전, 1: 녹음 중, 2: 녹음 완료
  const [audioURL, setAudioURL] = useState<string[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob[]>([]);
  const [isPlay, setIsPlay] = useState<boolean[]>([]);
  const [isConverted, setIsConverted] = useState<boolean[]>([]);
  const [model, setModel] = useState<number[]>([]);
  const [originVoicePaths, setOriginVoicePaths] = useState<string[]>([]);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const getOriginVoiceData = async () => {
    if (params.sourceCode) {
      const res = await getOriginVoices(params.sourceCode);
      console.log(res);
      setVideoPath(res.videoPath);
      setOriginVoiceList(res.voiceSources);
      setOriginVoicePaths(res.voiceSources.map((el: VoiceData) => {
        return el.voicePath
      }));
      setVoicePaths(res.voiceSources.map((el: VoiceData) => {
        return el.voicePath
      }));
      setModel(Array.from({length: res.voiceSources.length}, () => 0));
      setRecordState(Array.from({length: res.voiceSources.length}, () => 0));
      setAudioURL(Array.from({length: res.voiceSources.length}, () => ''));
      setAudioBlob(Array.from({length: res.voiceSources.length}, () => new Blob()));
      setIsPlay(Array.from({length: res.voiceSources.length}, () => false));
      setIsConverted(Array.from({length: res.voiceSources.length}, () => false));
      audioRefs.current = res.voiceSources.map(() => new Audio());
    }
  };

  const getVoiceModelData = async () => {
    if (params.sourceCode) {
      const res = await getVoiceModels(params.sourceCode);
      console.log(res);
      const sortedData = res.voiceModels.sort((a: ModelData, b:ModelData) => {
        if (a.existSource) return -1;
        if (b.existSource) return 1;
        return 0;
      });
      setModelList(sortedData);
      setModelInput(sortedData.map((el: ModelData) => ({
        value: el.modelCode,
        label: el.modelName
      })));
    }
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
    } catch (err) {
      console.error('오디오 녹음을 위한 장치 접근에 실패했습니다.', err);
      window.alert('오디오 장치가 연결됐는지 확인해주세요');
      navigate(`/dubbing/${params.sourceCode}`);
    }
  };

  const startRecording = (idx: number) => {
    if (mediaRecorder) {
      mediaRecorder.start();
      videoRef.current?.play();
      setRecordState(prev => {
        const newState = [...prev];
        newState[idx] = 1;
        return newState;
      });
    }
  };

  const stopRecording = (idx: number) => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      videoRef.current?.pause();
      setRecordState(prev => {
        const newState = [...prev];
        newState[idx] = 2;
        return newState;
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioURL(prev => {
            const newURL = [...prev];
            newURL[idx] = URL.createObjectURL(e.data);
            return newURL;
          });
          setAudioBlob(prev => {
            const newBlob = [...prev];
            newBlob[idx] = e.data;
            return newBlob;
          });
        }
      };
    }
  };

  const resetRecording = (idx: number) => {
    setRecordState(prev => {
      const newState = [...prev];
      newState[idx] = 0;
      return newState;
    });
    setAudioURL(prev => {
      const newURL = [...prev];
      newURL[idx] = '';
      return newURL;
    });
    setAudioBlob(prev => {
      const newBlob = [...prev];
      newBlob[idx] = new Blob();
      return newBlob;
    });
  };

  const playAudio = (idx: number) => {
    if (audioRefs.current[idx]) {
      audioRefs.current[idx].play();
      setIsPlay(prev => {
        const newState = [...prev];
        newState[idx] = true;
        return newState;
      });

      audioRefs.current[idx].onended = () => {
        setIsPlay(prev => {
          const newState = [...prev];
          newState[idx] = false;
          return newState;
        });
      }
    }
  };

  const stopAudio = (idx: number) => {
    audioRefs.current[idx].pause();
    audioRefs.current[idx].currentTime = 0;
    setIsPlay(prev => {
      const newState = [...prev];
      newState[idx] = false;
      return newState;
    });
  };

  const uploadAudio = async (idx: number) => {
    if (audioBlob[idx]) {
      const formData = new FormData();
      formData.append("recordingFile", audioBlob[idx], `dubbing${params.sourceCode}_voice${idx + 1}.wav`);
      // 업로드 api 호출
    }
  };

  useEffect(() => {
    getOriginVoiceData();
    getVoiceModelData();
    getMedia();
  }, [params.sourceCode])

  useEffect(() => {
    console.log(audioRefs)
    if (audioURL) {
      audioRefs.current = audioRefs.current.map((el, idx) => {
        const newEl = el;
        newEl.src = audioURL[idx];
        return newEl
      });
    }
  }, [audioURL])

  return (
    <Container>
      <div>
        <label htmlFor="title">제목:</label>
        <input type="text" name="title" id="title" maxLength={40} placeholder="최대 40글자까지 작성 가능합니다" />
      </div>
      <div className="video-box">
        <video ref={videoRef} controls src={s3URL + `${videoPath}`} />
      </div>
      <div>
        <div className="flex gap-4">
          <p>캐릭터</p>
          <p>더빙</p>
          <p>음성 모델</p>
          <p>피치 조절</p>
          <p>목소리 확인</p>
        </div>
        <hr />
        <div>
          {
            originVoiceList.map((el, idx) => (
              <div key={el.voiceIndex} className="flex">
                <p className="character">{el.voiceName}</p>
                {
                  recordState[idx] === 0 &&
                  <img onClick={() => startRecording(idx)} className="recordBtn" src={startRecordBtn} alt="startRecordBtn" />
                }
                {
                  recordState[idx] === 1 &&
                  <img onClick={() => stopRecording(idx)} className="recordBtn" src={stopRecordBtn} alt="stopRecordBtn" />
                }
                {
                  recordState[idx] === 2 &&
                  <>
                    {
                      isPlay[idx] ?
                      <img onClick={() => stopAudio(idx)} src={stopRecordBtn} className="recordBtn" alt="stopPlaying" />
                      :
                      <img onClick={() => playAudio(idx)} className="recordBtn" src={playRecordBtn} alt="playRecordBtn" />
                    }
                  </>
                }
                <Select 
                  value = {
                    modelInput.find((option) => option.value === model[idx])
                  }
                  options={modelInput}
                  onChange={(selectedOption) => setModel(prev => {
                    const newModel = [...prev];
                    newModel[idx] = selectedOption?.value || 0;
                    return newModel;
                  })}
                  placeholder="모델을 선택하세요" 
                />
                <input className="border" type="number" min={-12} max={12} defaultValue={0} />
                <Button $marginLeft={0} $marginTop={0}>변환</Button>
                {
                  isConverted[idx] ?
                  <audio controls src={undefined} />
                  :
                  recordState[idx] === 2 && <img onClick={() => resetRecording(idx)} src={reRecordBtn} alt="" />
                }
              </div>
            ))
          }
        </div>
        <Button $marginLeft={0} $marginTop={0}>제작</Button>
      </div>
    </Container>  
  )
}

export default Dubbing;