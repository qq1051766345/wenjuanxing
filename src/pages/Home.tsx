import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Home: FC = () => {
  const navigate = useNavigate();
  const login = () => {
    // navigate('/login');
    navigate({
      pathname: '/login',
      search: 'name=123',
    });
  };
  return (
    <>
      <Button type="default" onClick={login}>
        登陆
      </Button>
      <Link to="./register">注册</Link>
    </>
  );
};

export default Home;
