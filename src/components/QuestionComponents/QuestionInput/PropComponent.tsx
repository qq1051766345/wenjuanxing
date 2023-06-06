import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { QuestionInputPropsType } from './interface';

const PropComponent: FC<QuestionInputPropsType> = props => {
  const { text, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    // 数据变化及时更新数据
    form.setFieldsValue({ text, placeholder });
  }, [text, placeholder]);

  const changeHandler = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <>
      <Form
        disabled={disabled}
        layout="vertical"
        initialValues={{ text, placeholder }}
        onValuesChange={changeHandler}
        form={form}
      >
        <Form.Item label="标题" name="text" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="提示" name="placeholder">
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
