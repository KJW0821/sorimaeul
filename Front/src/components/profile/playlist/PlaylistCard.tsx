import styled from 'styled-components';

const CardContainer = styled.div`
  width: 20rem;
  height: 30rem;
`;

interface Props {
  playlistCode: number,
  playlistName: string,
  createTime: string
}


export const PlaylistCard: React.FC<Props> = ({playlistCode, playlistName, createTime}) => {
  return (
    <CardContainer>
      <img src={"/src/assets/playlist.png"} alt='플레이리스트 고정 이미지' />
      <p>{playlistName}</p>
      <p>{createTime}</p>

    </CardContainer>

  )
}