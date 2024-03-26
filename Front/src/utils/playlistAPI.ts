import API from "./axios";

const URL = "/playlist";


// 플레이리스트 생성
export const createPlaylist = (playlistName: string) => {
  return API.post(URL, playlistName)
  .then(res => res)
  .catch(err => console.log(err))
}

// 플레이리스트 전체 목록 조회
interface ListParams {
  page: number;
}

export const getPlaylists = (page: number = 1) => {
  const params: ListParams = { page };
  return API.get(URL, { params })
  .then(res => res.data)
  .catch(err => console.log(err))
}

// 플레이리스트 상세 조회 : 플레이리스트 내 커버 목록 조회
export const getPlaylist = (playlistCode: string) => {
  return API.get(URL + `/${playlistCode}`)
  .then((res) => res.data)
  .catch(err => console.log(err))
}

// 플레이리스트 수정
export const updatePlaylist = (playlistCode: string, playlistName: string) => {
  return API.patch(URL + `/${playlistCode}`, playlistName)
  .then((res) => res.data)
  .catch(err => console.log(err))
}


// 플레이리스트 삭제 
export const deletePlaylist = (playlistCode: string) => {
  return API.delete(URL + `/${playlistCode}`)
  .then(res => res)
  .catch(err => console.log(err))
}