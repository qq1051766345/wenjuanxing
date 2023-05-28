import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';

const { Title } = Typography;

const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log(data));
  });
  // const login = () => {
  //   // navigate('/login');
  //   navigate({
  //     pathname: '/login',
  //     search: 'name=123',
  //   });
  // };
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 ｜ 在线投票</Title>
        <Typography>已经累计创建问卷100份</Typography>
        <div>
          <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
