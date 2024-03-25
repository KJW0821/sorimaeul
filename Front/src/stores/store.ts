import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user";
import voiceModelSlice, { VoiceModelState } from "./voiceModel";
import menuSlice, { MenuState }  from "./menu";
import commonSlice, { CommonState } from "./common";
import playlistsSlice, { PlaylistsState } from "./playlists";
import playlistSlice, { PlaylistSongsState } from "./playlist";


export interface RootState {
  user: UserState;
  voiceModel: VoiceModelState;
  menu: MenuState;
  common: CommonState;
  playlists: PlaylistsState;
  playlist: PlaylistSongsState;

}

const store = configureStore({
  reducer: {
    user: userSlice,
    voiceModel: voiceModelSlice,
    menu: menuSlice,
    common: commonSlice,
    playlists: playlistsSlice,
    playlist: playlistSlice,
  }
})

export default store;