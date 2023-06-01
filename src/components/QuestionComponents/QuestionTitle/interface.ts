export interface QuestionTitlePropsType {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  inCenter?: boolean;
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  inCenter: false,
};
