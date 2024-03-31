import React, { useState, useRef, useEffect } from 'react';
import playBtn from "../../assets/playSong.png";
import pauseBtn from "../../assets/pauseSong.png";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { setCurrentAudio } from '../../stores/audioPlayer';

const Button = styled.button`
  position: relative;
  top: 5px; 
  margin-right: 12px; 

  img {
    width: 24px;
  }
`;

// 플레이리스트 상세 조회 시의 플레이어 : 재생(일시정지) 기능 + 오디오의 길이 제공
interface CustomAudioPlayerProps {
  src: string; // 오디오 파일의 URL
  coverCode: string;
}

const DetailPlayer: React.FC<CustomAudioPlayerProps> = ({ src, coverCode }) => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null); // 오디오 태그를 참조하기 위한 ref
  const currentAudio = useSelector((state: RootState) => state.audioPlayer.currentAudio);
  const isPlaying = coverCode === currentAudio;
  const [duration, setDuration] = useState(0); // 오디오의 총 길이

  // 재생 상태 관리 
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  // 재생 및 일시정지 토글 함수
  const togglePlayPause = () => {
    if (isPlaying) {
      dispatch(setCurrentAudio(null));
    } else {
      dispatch(setCurrentAudio(coverCode));
    }
  };

  // 오디오의 총 길이를 설정하는 함수
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener('loadedmetadata', setAudioData);
      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
      };
    }
  }, []);

   // 초 단위를 'mm:ss' 형식으로 변환하는 함수
   const formatDuration = (seconds: number): string  => {
    const minutesPart = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutesPart}:${secondsPart}`;
  };

  return (
    <div>
      <audio ref={audioRef} src={src} preload="metadata" />
      <span className="mr-6 text-stone-400">({formatDuration(duration)})</span>
      <Button className="mr-3" onClick={togglePlayPause}>{isPlaying ? (<img src={pauseBtn}/>) : (<img src={playBtn}/>)}</Button>
    </div>
  );
};

export default DetailPlayer;
