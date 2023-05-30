import { configureStore } from '@reduxjs/toolkit';
import useReducer, { UserStateType } from './userReducer';

export type StateType = {
  user: UserStateType;
};

export default configureStore({
  reducer: {
    // 分模块导入
    user: useReducer,
  },
});
