import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user";
import voiceModelSlice, { VoiceModelState } from "./voiceModel";

export interface RootState {
  user: UserState;
  voiceModel: VoiceModelState;
}

const store = configureStore({
  reducer: {
    user: userSlice,
    voiceModel: voiceModelSlice
  }
})

export default store;