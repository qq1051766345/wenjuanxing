/*
  问卷的标题组件
*/

import QuestionInput from './component';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: 'questionInput', //要和后端统一
  component: QuestionInput,
  defaultProps: QuestionTitleDefaultProps,
};
