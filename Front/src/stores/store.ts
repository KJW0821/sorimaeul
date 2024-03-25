import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user";
import voiceModelSlice, { VoiceModelState } from "./voiceModel";
import commonSlice, { CommonState } from "./common";

export interface RootState {
  user: UserState;
  voiceModel: VoiceModelState;
  common: CommonState;
}

const store = configureStore({
  reducer: {
    user: userSlice,
    voiceModel: voiceModelSlice,
    common: commonSlice
  }
})

export default store;