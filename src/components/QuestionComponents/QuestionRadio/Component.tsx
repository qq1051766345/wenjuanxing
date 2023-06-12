import React, { FC } from 'react';
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface';
import { Radio, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = props => {
  const { title, isVertical, options = [], value } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((option, index) => {
            const { value, text } = option;
            return (
              <Radio key={index} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </>
  );
};

export default Component;
