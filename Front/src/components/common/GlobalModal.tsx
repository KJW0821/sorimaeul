import { useSelector } from "react-redux";
import PlaylistCreateModal from "../profile/playlist/PlaylistCreateModal";
import PlaylistDetailModal from "../profile/playlist/PlaylistDetailModal";
import { RootState } from "../../stores/store";
import { Container, Overlay } from "./ModalStyles";


const MODAL_TYPES = {
  playlistcreate: 'playlistcreate',
  playlistdetail: 'playlistdetail',
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.playlistcreate,
    component: <PlaylistCreateModal />,
  },
  {
    type: MODAL_TYPES.playlistdetail,
    component: <PlaylistDetailModal />,
  },
];

const GlobalModal = () => {
  const { modalType, isOpen } = useSelector((state: RootState) => state.modal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };


  return (
    <Container>
      <Overlay />
      {renderModal()}
    </Container>
  );
};

export default GlobalModal;