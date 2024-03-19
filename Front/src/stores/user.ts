import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  nickname: string,
  profileImage: string,
  loggedIn: boolean
}

const initialState: UserState = {
  nickname: "",
  profileImage: "",
  loggedIn: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      const { nickname, profileImage } = action.payload;
      state.nickname = nickname;
      state.profileImage = profileImage;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.nickname = "";
      state.profileImage = "";
    }
  }
});

export const { set, login, logout } = userSlice.actions;
export default userSlice.reducer;