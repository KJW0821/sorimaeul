import API from "./axios";

const URL = "/playlist";

// 플레이리스트 생성
interface PlaylistCreateInterface {
  playlistName: string;
}

export const createPlaylist = (data: PlaylistCreateInterface) => {
  return API.post(URL, data)
  .then(res => res)
  .catch(err => console.log(err))
}

// 플레이리스트 삭제 
export const deletePlaylist = (playlistCode: string) => {
  return API.delete(URL + `/${playlistCode}`)
  .then(res => res)
  .catch(err => console.log(err))
}