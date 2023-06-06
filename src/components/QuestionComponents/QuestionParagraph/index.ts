import QuestionParagraph from './Component';
import { QuestionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

export default {
  title: '输入框',
  type: 'questionParagraph', //要和后端统一
  PropComponent: PropComponent,
  Component: QuestionParagraph,
  defaultProps: QuestionParagraphDefaultProps,
};
