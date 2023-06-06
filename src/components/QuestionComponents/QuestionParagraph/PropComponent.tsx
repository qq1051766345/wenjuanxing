import React, { FC, useEffect } from 'react';
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface';
import { Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

const PropComponent: FC<QuestionParagraphPropsType> = props => {
  const [form] = useForm();
  const {
    text = '一行文本',
    isCenter = false,
    disabled,
    onChange,
  } = { ...props, ...QuestionParagraphDefaultProps };
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);

  const handleChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      onChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <TextArea />
      </Form.Item>
      <Form.Item label="居中显示" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
