import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user";
import voiceModelSlice, { VoiceModelState } from "./voiceModel";
import menuSlice, { MenuState }  from "./menu";
import commonSlice, { CommonState } from "./common";

export interface RootState {
  user: UserState;
  voiceModel: VoiceModelState;
  menu: MenuState;
  common: CommonState;
}

const store = configureStore({
  reducer: {
    user: userSlice,
    voiceModel: voiceModelSlice,
    menu: menuSlice,
    common: commonSlice
  }
})

export default store;