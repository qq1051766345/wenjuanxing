import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ComponentPropType } from '../../components/QuestionComponents';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropType;
};

export type ComponentListType = {
  componentList: ComponentInfoType[];
};

const initialState: ComponentListType = {
  componentList: [],
};

export const componentsSlice = createSlice({
  name: 'componentList',
  initialState,
  reducers: {
    // 重制所有组件
    reset(state: ComponentListType, action: PayloadAction<ComponentListType>) {
      return action.payload;
    },
  },
});

export const { reset } = componentsSlice.actions;
export default componentsSlice.reducer;
