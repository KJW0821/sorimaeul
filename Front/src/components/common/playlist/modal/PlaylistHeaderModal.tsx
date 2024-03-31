import { LogoIcon, ModalHeader } from "../../../profile/playlist/PlaylistDetailModal";
import { Content } from "../../ModalStyles";
import logo from "../../../../assets/logoBig.png";
import { styled } from "styled-components";
import { closeModal } from "../../../../stores/modal";

export const CloseButton = styled.div`
  width: 36px;
  height: 34px;
  border-radius: 50%;
  background: #BFEA44;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const PlaylistHeaderModal: React.FC = () => {
  function dispatch(arg0: { payload: undefined; type: "modal/closeModal"; }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
    <Content $width={55} $height={55} $borderRadius={30} $background="black">
    <ModalHeader>
    <LogoIcon src={logo} alt="sorimaeul logo" />
    <p>플레이리스트</p>
    <CloseButton onClick={() => dispatch(closeModal())}>x</CloseButton>
    </ModalHeader>
    </Content>
    </>
  )
}

export default PlaylistHeaderModal;