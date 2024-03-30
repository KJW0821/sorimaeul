import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface UserState {
  nickname: string,
  profileImage: string,
  loggedIn: boolean,
  learnCount: number
}

const initialState: UserState = {
  nickname: "",
  profileImage: "",
  loggedIn: false,
  learnCount: 0
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      const { nickname, profileImage, learnCount } = action.payload;
      state.nickname = nickname;
      state.profileImage = profileImage;
      state.learnCount = learnCount;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.nickname = "";
      state.profileImage = "";
      state.learnCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});

export const { set, login, logout } = userSlice.actions;
export default userSlice.reducer;