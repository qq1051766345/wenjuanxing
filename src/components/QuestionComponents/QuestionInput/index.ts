/*
  问卷的输入框组件
*/

import QuestionInput from './component';
import { QuestionInputDefaultProps } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: 'questionInput',
  component: QuestionInput, //要和后端统一
  defaultProps: QuestionInputDefaultProps,
};
