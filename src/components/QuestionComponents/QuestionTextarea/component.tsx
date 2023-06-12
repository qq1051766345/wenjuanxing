import React, { FC } from 'react';
import { QuestionTextAreaDefaultProps, QuestionTextareaPropsType } from './interface';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionInput: FC<QuestionTextareaPropsType> = props => {
  const { text = '输入框标题', placeholder = '请输入....' } = props;

  return (
    <>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </>
  );
};

export default QuestionInput;
