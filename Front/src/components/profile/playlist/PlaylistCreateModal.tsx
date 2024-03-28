import styled from "styled-components";
import { useState } from "react";
import { Button } from "../../common/Button";
import { CloseButton, Content } from "../../common/ModalStyles";
import { InputBox } from "../../common/InputBox";
import { PlaylistCreateInterface, createPlaylist } from "../../../utils/playlistAPI";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../stores/modal";
import { addPlaylist } from "../../../stores/playlists";

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #888888;
`;



function PlaylistCreateModal () {
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const data: PlaylistCreateInterface = {
    playlistName
  }
  const handlePlaylistName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlaylistName(e.target.value);
  }

  const submitHandler = async () => {
    const res = await createPlaylist(data);
    if (res?.status === 201) {
      console.log(res.data, "플레이리스트 생성 완료");
      dispatch(addPlaylist(res.data));
    } else {
      console.log("실패");
    }
    dispatch(closeModal());
  }


  return (
    <>
    <Content>
      <Label htmlFor="playlistName">플레이리스트 이름을 입력해주세요.</Label>
      <InputBox type="text" id="playlistName" name="playlistName" value={data.playlistName} onChange={ handlePlaylistName}/>
      <Button onClick={submitHandler} $marginLeft={0} $marginTop={0} disabled={playlistName.trim().length === 0}>생성</Button>
      <CloseButton onClick={() => dispatch(closeModal())}>x</CloseButton>
    </Content>
    </>
  )
}
export default PlaylistCreateModal;