import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import playBtn from "../../assets/playBlack.png";
import pauseBtn from "../../assets/pauseBlack.png";
import prevBtn from "../../assets/prev.png";
import nextBtn from "../../assets/next.png";
import styled, { keyframes } from 'styled-components';

const flowText = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const FlowingText = styled.div`
  white-space: nowrap;
  animation: ${flowText} 7s linear infinite;
`;

const TextArea = styled.div`
  width: 33%;
  overflow: hidden;
`

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
  width: 100%;
`;

const IconArea = styled.div`
  display: flex;
  width: 18%;
`;

const Icon = styled.img`
  width: 1rem;
  height: 100%;
  cursor: pointer;
`;

const StyledRangeInput = styled.input`
  width: 38%;
}`;

const HeaderPlayer: React.FC = () => {
  const selectedPlaylist = useSelector((state: RootState) => state.playlists.selectedPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const baseURL = "https://usagi-sorimaeul.s3.ap-northeast-2.amazonaws.com";

  useEffect(() => {
    // 선택된 플레이리스트 변경 시 오디오 초기화
    if (selectedPlaylist && selectedPlaylist.covers && selectedPlaylist.covers.length > 0) {
      setCurrentTrackIndex(0);
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(`${baseURL}/${selectedPlaylist.covers[0].storagePath}`);
      setAudio(newAudio);
      setIsPlaying(false);
    }
  }, [selectedPlaylist]);

  useEffect(() => {
    if (selectedPlaylist && selectedPlaylist.covers && selectedPlaylist.covers.length > 0 && audio) {
      audio.src = `${baseURL}/${selectedPlaylist.covers[currentTrackIndex].storagePath}`;
      if (isPlaying) {
        audio.play().catch((error) => console.error("Audio play failed", error));
      }
      audio.addEventListener('ended', handleNextTrack);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      // 곡이 변경되면 시간 초기화
      setCurrentTime(0);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleNextTrack);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [currentTrackIndex, selectedPlaylist, audio, isPlaying]);

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => console.error("Audio play failed", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    if (selectedPlaylist && selectedPlaylist.covers && currentTrackIndex < selectedPlaylist.covers.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0); // 리스트의 마지막까지 재생했다면 처음으로 돌아감
    }
  };

  const handlePrevTrack = () => {
    if (selectedPlaylist) {
      const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : selectedPlaylist.covers.length - 1;
      setCurrentTrackIndex(prevIndex);
    }
  };

  const handleTimeUpdate = () => {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const getProgress = () => {
    if (audio && audio.duration) {
      return (currentTime / audio.duration) * 100;
    }
    return 0;
  };

  if (!selectedPlaylist) {
    return <div>플레이리스트를 선택해주세요.</div>;
  }

  if (!selectedPlaylist || !selectedPlaylist.covers || selectedPlaylist.covers.length === 0) {
    return <div>재생할 곡이 없습니다.</div>;
  }

  return (
    <PlayerContainer>
      <TextArea>
        <FlowingText>{selectedPlaylist.covers[currentTrackIndex].title} - {selectedPlaylist.covers[currentTrackIndex].singer} ({selectedPlaylist.covers[currentTrackIndex].coverSinger}) </FlowingText>
      </TextArea>
      <StyledRangeInput type="range" min="0" max="100" value={getProgress()} readOnly />
      <IconArea>
        <Icon src={prevBtn} onClick={handlePrevTrack} />
        <div onClick={handlePlayPause}>{isPlaying ? <Icon src={pauseBtn} /> : <Icon src={playBtn} />}</div>
        <Icon src={nextBtn} onClick={handleNextTrack} />
      </IconArea>
    </PlayerContainer>
  );
};

export default HeaderPlayer;