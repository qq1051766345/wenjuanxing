import React, { FC, useMemo } from 'react';
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface';
import { Typography } from 'antd';

const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = props => {
  const { text: defaultText, isCenter: defaultCenter } = QuestionParagraphDefaultProps;
  const { text = defaultText, isCenter = defaultCenter } = props;

  const textList = useMemo(() => {
    const textList = text!.split('\n');
    console.log(textList, '12312');
    return textList;
  }, [text]);

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Paragraph>
  );
};

export default Component;
