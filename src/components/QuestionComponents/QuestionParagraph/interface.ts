export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  // 用于属性表单
  disabled?: boolean;
  onChange?: (newProps: QuestionParagraphPropsType) => void;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行文本',
  isCenter: false,
};
