import React, { FC, useEffect } from 'react';
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoPropsType> = props => {
  const { title, desc, onChange, disabled } = { ...QuestionInfoDefaultProps, ...props };
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);

  const handleChange = () => {
    if (onChange) {
      // 传递给父组件新表单的值
      onChange(form.getFieldsValue());
    }
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      onChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
