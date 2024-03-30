import styled from 'styled-components';
import { Content } from "../../components/common/ModalStyles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '../../stores/modal';
import PlaylistSelect from '../../components/common/playlist/modal/PlaylistSelect';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const CloseButton = styled.div`
  width: 1.5rem;
  height: 1.5em;
  border-radius: 50%;
  background: #FDA06C;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 22px;
`

function PlaylistAddModal() {
  const dispatch = useDispatch();

  return (
    <>
      <Content $width={30} $height={20} $borderRadius={10} $background='#000000'>
        <HeaderContainer>
          <Title>플레이리스트를 선택해주세요.</Title>
          <CloseButton color="#FDA06C" onClick={() => dispatch(closeModal())}>x</CloseButton>
        </HeaderContainer>
        <PlaylistSelect />
      </Content>
    </>
  )
}
export default PlaylistAddModal;