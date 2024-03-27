import { useDispatch, useSelector } from "react-redux";
import PlaylistAddModal from "../../pages/aiCover/PlaylistAddModal";
import PlaylistCreateModal from "../profile/playlist/PlaylistCreateModal";
import PlaylistDetailModal from "../profile/playlist/PlaylistDetailModal";
import { RootState } from "../../stores/store";
import { Container, Overlay } from "./ModalStyles";
import { closeModal } from "../../stores/modal";



const MODAL_TYPES = {
  playlistcreate: 'playlistcreate',
  playlistdetail: 'playlistdetail',
  playlistadd: 'playlistadd'
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
  {
    type: MODAL_TYPES.playlistadd,
    component: <PlaylistAddModal />,
  },
];

const GlobalModal = () => {
  const { modalType, isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };


  return (
    <Container>
      <Overlay onClick={() => dispatch(closeModal())}/>
      {renderModal()}
    </Container>
  );
};

export default GlobalModal;