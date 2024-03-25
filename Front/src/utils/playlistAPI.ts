import API from "./axios";

const URL = "/playlist";

// 플레이리스트 생성
interface PlaylistCreateInterface {
  playlistName: string;
}

export const createPlaylist = (data: PlaylistCreateInterface) => {
  return API.post(URL, data)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}