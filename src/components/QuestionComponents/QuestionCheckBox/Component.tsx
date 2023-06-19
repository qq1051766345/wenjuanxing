import React, { FC } from 'react';
import { QuestionCheckBoxDefaultProps, QuestionCheckBoxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const Component: FC<QuestionCheckBoxPropsType> = props => {
  const { title, isVertical, list = [] } = { ...QuestionCheckBoxDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {list.map((item, index) => {
            const { value, text, checked } = item;
            return (
              <Checkbox value={value} key={value} checked={checked}>
                {text}
              </Checkbox>
            );
          })}
        </Space>
      </div>
    </div>
  );
};

export default Component;
