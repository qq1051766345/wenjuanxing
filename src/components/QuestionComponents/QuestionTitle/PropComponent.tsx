import React, { FC, useEffect } from 'react';
import { Form, Input, Checkbox, Select } from 'antd';
import { QuestionTitlePropsType } from './interface';

const PropComponent: FC<QuestionTitlePropsType> = props => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    // 数据变化及时更新数据
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

  const changValueHandler = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={changValueHandler}
      disabled={disabled}
    >
      <Form.Item label="标题" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item label="标题" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
