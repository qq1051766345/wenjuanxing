/*
  问卷的标题组件
*/

import QuestionTitle from './component';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: 'questionTitle', //要和后端统一
  Component: QuestionTitle,
  defaultProps: QuestionTitleDefaultProps,
};
