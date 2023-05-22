import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const navigate = useNavigate();
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
