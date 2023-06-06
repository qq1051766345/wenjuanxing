/*
  问卷的标题组件
*/

import QuestionTitle from './component';
import { QuestionTitleDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: '标题',
  type: 'questionTitle', //要和后端统一
  Component: QuestionTitle,
  PropComponent, // 属性组件，用于修改属性
  defaultProps: QuestionTitleDefaultProps,
};
