import React, { FC } from 'react';
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = props => {
  const { title = '输入框标题', placeholder } = props;
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} onClick={e => e.defaultPrevented}></Input>
      </div>
    </>
  );
};

export default QuestionInput;
