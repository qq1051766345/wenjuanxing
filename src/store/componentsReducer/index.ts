import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ComponentPropType } from '../../components/QuestionComponents';
import produce from 'immer';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
};

const initialState: ComponentStateType = {
  selectedId: '',
  componentList: [],
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // componentList
    // 重置所有组件
    reset(state: ComponentStateType, action: PayloadAction<ComponentStateType>) {
      return action.payload;
    },

    // 添加新组件
    addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index < 0) {
        // 没找到就在末尾增加组件
        componentList.push(newComponent);
      } else {
        componentList.splice(index + 1, 0, newComponent);
      }
      draft.selectedId = newComponent.fe_id;
    }),
    // 修改selectedId

    // changeSelectedId(state: ComponentStateType, action: PayloadAction<string>) {
    //   state.selectedId = action.payload;
    // },

    // 改进不可变数据的写法
    changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
  },
});

export const { reset, changeSelectedId, addComponent } = componentsSlice.actions;
export default componentsSlice.reducer;
