export interface QuestionTextareaPropsType {
  text?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
  disabled?: boolean;
}

export const QuestionTextAreaDefaultProps: QuestionTextareaPropsType = {
  text: '输入框标题',
  placeholder: '请输入.....',
  disabled: false,
};
