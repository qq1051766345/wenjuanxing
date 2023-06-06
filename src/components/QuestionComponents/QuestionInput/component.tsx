import React, { FC } from 'react';
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = props => {
  const { text = '输入框标题', placeholder = '请输入....' } = props;
  return (
    <>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <Input placeholder={placeholder} onClick={e => e.defaultPrevented}></Input>
      </div>
    </>
  );
};

export default QuestionInput;
