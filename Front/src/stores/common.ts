import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlarmData {
  notifyCode: number;
  userCode: number;
  notifyContent: string;
  isChecked: number;
  createdTime: string;
  notifyType: string;
  targetCode: number;
}

export interface CommonState {
  isOpen: boolean;
  unreadMsgCnt: number;
  alarmList: AlarmData[];
}

const initialState: CommonState = {
  isOpen: false,
  unreadMsgCnt: 0,
  alarmList: []
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.isOpen = !state.isOpen
    },
    increaseUnreadMsgCnt(state) {
      state.unreadMsgCnt += 1
    },
    setAlarmList(state, action) {
      state.alarmList = action.payload
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

export const { toggleSideBar, increaseUnreadMsgCnt, setAlarmList, checkAlarmState, removeAlarm } = commonSlice.actions;
export default commonSlice.reducer;