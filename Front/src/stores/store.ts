import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user";
import voiceModelSlice, { VoiceModelState } from "./voiceModel";
import menuSlice, { MenuState }  from "./menu";

export interface RootState {
  user: UserState;
  voiceModel: VoiceModelState;
  menu: MenuState;
}

const store = configureStore({
  reducer: {
    user: userSlice,
    voiceModel: voiceModelSlice,
    menu: menuSlice,
  }
})

export default store;