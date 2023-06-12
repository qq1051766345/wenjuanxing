export interface QuestionInfoPropsType {
  title?: string;
  desc?: string;
  // 属性需要使用
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disabled?: boolean;
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
  disabled: false,
};
