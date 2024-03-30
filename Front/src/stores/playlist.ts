import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface Song {
  coverCode: string,
  coverSinger: string;
  singer: string;
  title: string;
  writer: string;
  storagePath: string;
  isPublic: boolean;
}

export interface PlaylistSongsState {
  songs: Song[];
}

const initialState: PlaylistSongsState = {
  songs: [],
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});

export const { setSongs } = playlistSlice.actions;
export default playlistSlice.reducer;