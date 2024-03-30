import styled from 'styled-components';

const PlaylistComponent = styled.div`
  box-sizing: border-box;
  border: 1px dashed #000000;
  border-radius: 50px;
  padding: 20px; 
  margin: 10px; 
  margin-left: auto;
  width: 300px; 
  height: 50px; 
  right: 0;
`;


const Playlist: React.FC = () => {
  // 더미 데이터
  const songs = [
    { title: "노래 제목 1", artist: "가수명 1" },

  ];

  return (
    <PlaylistComponent>
      {songs.map((song, index) => (
        <div key={index}>
          <strong>{song.title}</strong> - {song.artist}
        </div>
      ))}
    </PlaylistComponent>
  );
};

export default Playlist;