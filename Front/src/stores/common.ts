import { createSlice } from "@reduxjs/toolkit";

export interface AlarmData {
  notifyCode: number;
  userCode: number;
  notifyContent: string;
  notifyType: string;
  isChecked: number;
  createdTime: string;
  targetCode: number;
}

export interface CommonState {
  isOpen: boolean;
  alarmList: AlarmData[];
}

const initialState: CommonState = {
  isOpen: false,
  alarmList: []
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.isOpen = !state.isOpen
    },
    setAlarmList(state, action) {
      state.alarmList = action.payload;
    },
    checkAlarmState(state, action) {
      state.alarmList = state.alarmList.map(el => {
        if (el.notifyCode === action.payload) {
          el.isChecked = 1;
        }
        return el;
      })
    },
    removeAlarm(state, action) {
      state.alarmList = state.alarmList.filter(el => el.notifyCode !== action.payload)
    }
  }
});

export const { toggleSideBar, setAlarmList, checkAlarmState, removeAlarm } = commonSlice.actions;
export default commonSlice.reducer;