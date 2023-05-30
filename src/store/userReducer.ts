import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import logo from '../components/Logo';

export type UserStateType = {
  name: string;
  nickname: string;
};

const INIT_STATE: UserStateType = {
  name: '',
  nickname: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload; //设置username和nickname
    },
    logoutReducer: () => {
      return INIT_STATE; //清空username和nickname
    },
  },
});

const useReducer = userSlice.reducer;
export default useReducer;

export const { loginReducer, logoutReducer } = userSlice.actions;
