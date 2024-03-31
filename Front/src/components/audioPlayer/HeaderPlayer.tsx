import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const HeaderPlayer: React.FC = () => {
  const selectedPlaylist = useSelector((state: RootState) => state.playlists.selectedPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
    // selectedPlaylist가 유효하고, covers 배열에 항목이 있는 경우에만 처리
    if (selectedPlaylist && selectedPlaylist.covers && selectedPlaylist.covers.length > 0 && audio) {
      audio.src = `${baseURL}/${selectedPlaylist.covers[currentTrackIndex].storagePath}`;
      if (isPlaying) {
        audio.play().catch((error) => console.error("Audio play failed", error));
      }
      audio.addEventListener('ended', handleNextTrack);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleNextTrack);
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
    if (selectedPlaylist &&   selectedPlaylist.covers &&currentTrackIndex < selectedPlaylist.covers.length - 1) {
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

  if (!selectedPlaylist) {
    return <div>플레이리스트를 선택해주세요.</div>;
  }

  if (!selectedPlaylist || !selectedPlaylist.covers || selectedPlaylist.covers.length === 0) {
    return <div>재생할 곡이 없습니다.</div>;
  }
  
  return (
    <div>
      <div>현재 재생 중: {selectedPlaylist.covers[currentTrackIndex].title}</div>
      <button onClick={handlePlayPause}>{isPlaying ? "일시 정지" : "재생"}</button>
      <button onClick={handlePrevTrack}>이전 곡</button>
      <button onClick={handleNextTrack}>다음 곡</button>
    </div>
  );
};

export default HeaderPlayer;