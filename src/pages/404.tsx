import React, { FC } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PATHNAME } from '../router/index';

const Error: FC = () => {
  const nav = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={() => nav(HOME_PATHNAME)}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
