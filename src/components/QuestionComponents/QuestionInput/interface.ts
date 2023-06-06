export interface QuestionInputPropsType {
  text?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionInputPropsType) => void;
  disabled?: boolean;
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  text: '输入框标题',
  placeholder: '请输入.....',
  disabled: false,
};
