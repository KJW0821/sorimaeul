import styled from 'styled-components';

import HeaderPlayer from '../../../audioPlayer/HeaderPlayer';



const HeaderPlayerContainer = styled.div`
  width: 88%;
  margin-left: auto;
`;


const Playlist: React.FC = () => {



  return (
    <>
      <HeaderPlayerContainer>
        <HeaderPlayer/>
      </HeaderPlayerContainer>
    </>
  );
};

export default Playlist;