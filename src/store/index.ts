import { configureStore } from '@reduxjs/toolkit';
import useReducer, { UserStateType } from './userReducer';
import componentReducer, { ComponentListType } from './componentsReducer';

export type StateType = {
  user: UserStateType;
  componentList: ComponentListType;
};

export default configureStore({
  reducer: {
    // 分模块导入
    // 用户信息
    user: useReducer,
    //组件列表
    componentList: componentReducer,
    //问卷信息 title desc
  },
});
