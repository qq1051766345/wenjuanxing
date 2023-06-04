import type { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

// 各个组件统一的props
export type ComponentPropType = QuestionInputPropsType & QuestionTitlePropsType;

// 统一定制组件的配置
export type ComponentConfigType = {
  title: string;
  type: string;
  Component: FC<ComponentPropType>;
  defaultProps: ComponentPropType;
};

// 全部组件配置的列表
export const componentConfigList: ComponentConfigType[] = [QuestionInputConf, QuestionTitleConf];

// 组件分组
export const componentGroupList = [
  {
    groupId: '1',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: '2',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
];

export function getComponentConfigByType(type: string) {
  return componentConfigList.find(c => c.type === type);
}
