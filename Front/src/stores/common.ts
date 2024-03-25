import { createSlice } from "@reduxjs/toolkit";

export interface CommonState {
  isOpen: boolean;
}

const initialState: CommonState = {
  isOpen: false
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.isOpen = !state.isOpen
    }
  }
});

export const { toggleSideBar } = commonSlice.actions;
export default commonSlice.reducer;