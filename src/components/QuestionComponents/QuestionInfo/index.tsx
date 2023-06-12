import QuestionInfo from './Component';
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: '问卷标题',
  type: 'questionInfo', //要和后端统一
  PropComponent: PropComponent,
  Component: QuestionInfo,
  defaultProps: QuestionInfoDefaultProps,
};
