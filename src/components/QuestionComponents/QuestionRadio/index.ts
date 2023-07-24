/*
  问卷的输入框组件
*/

import QuestionRadio from './Component';
import { QuestionRadioDefaultProps } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
export * from './interface';

export default {
  title: '单选框',
  type: 'questionRadio', //要和后端统一
  PropComponent: PropComponent,
  Component: QuestionRadio,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
};
