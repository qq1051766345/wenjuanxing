import { configureStore } from '@reduxjs/toolkit';
import useReducer, { UserStateType } from './userReducer';
import componentReducer, { ComponentStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  components: ComponentStateType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // 分模块导入
    // 用户信息
    user: useReducer,
    //组件列表
    components: componentReducer,
    //问卷信息 title desc
    pageInfo: pageInfoReducer,
  },
});
