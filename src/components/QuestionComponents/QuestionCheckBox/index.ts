/*
  问卷的多选框组件
*/

import QuestionCheckbox from './Component';
import { QuestionCheckBoxDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

export default {
  title: '单选框',
  type: 'questionCheckBox', //要和后端统一
  PropComponent: PropComponent,
  Component: QuestionCheckbox,
  defaultProps: QuestionCheckBoxDefaultProps,
};
