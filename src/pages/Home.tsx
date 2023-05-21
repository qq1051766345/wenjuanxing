import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      <button onClick={login}>登陆</button>
      <Link to="./register">注册</Link>
    </>
  );
};

export default Home;
