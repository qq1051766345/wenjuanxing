/*
  问卷的输入框组件
*/

import QuestionTextarea from './component';
import { QuestionTextAreaDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

export default {
  title: '可变化输入框',
  type: 'questionTextarea', //要和后端统一
  PropComponent: PropComponent,
  Component: QuestionTextarea,
  defaultProps: QuestionTextAreaDefaultProps,
};
