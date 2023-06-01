import React, { FC } from 'react';
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface';
import { Typography } from 'antd';

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = props => {
  const { text = '一行标题', level = 1, inCenter } = props;

  const genFontSize = (level: number) => {
    if (level === 1) return '24px';
    if (level === 2) return '20px';
    if (level === 3) return '16px';
    return '16px';
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: inCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
