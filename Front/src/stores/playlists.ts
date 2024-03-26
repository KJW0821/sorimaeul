import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface Playlist {
  playlistCode: string;
  playlistName: string;
  createTime: string;
}

export interface PlaylistsState {
  playlists: Playlist[];
  selectedPlaylist?: Playlist;
  totalPages: number;
}

const initialState: PlaylistsState = {
  playlists: [],
  totalPages: 0,
};

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    // 기존 플레이리스트 목록에 새로 생성된 플레이리스트를 추가하는 액션
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    // 기존 플레이리스트 목록에서 삭제된 플레이리스트를 제거하는 액션
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(playlist => playlist.playlistCode !== action.payload);
    },
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.selectedPlaylist = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { addPlaylist, removePlaylist, setPlaylists, setSelectedPlaylist, setTotalPages } = playlistsSlice.actions;
export default playlistsSlice.reducer;