import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface Playlist {
  playlistCode: number;
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

export const { setPlaylists, setSelectedPlaylist, setTotalPages } = playlistsSlice.actions;
export default playlistsSlice.reducer;