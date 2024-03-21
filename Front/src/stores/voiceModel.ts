import { createSlice } from "@reduxjs/toolkit";

export interface VoiceModelState {
  modelCode: number,
  modelName: string,
  storagePath: string,
  imagePath: string,
  recordCount: number,
  learnState: number,
  method: string
}

const initialState: VoiceModelState = {
  modelCode: 0,
  modelName: "",
  storagePath: "",
  imagePath: "",
  recordCount: 0,
  learnState: 1,
  method: "self"
}

const voiceModelSlice = createSlice({
  name: "voiceModel",
  initialState,
  reducers: {
    initModelInfo(state, action) {
      state.modelCode = action.payload;
    }
  }
});

export const { initModelInfo } = voiceModelSlice.actions;
export default voiceModelSlice.reducer;