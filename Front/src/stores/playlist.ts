import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    // 여기에 더 많은 리듀서를 추가할 수 있습니다. 예를 들어, 노래 추가, 삭제 등
  },
});

export const { setSongs } = playlistSlice.actions;
export default playlistSlice.reducer;