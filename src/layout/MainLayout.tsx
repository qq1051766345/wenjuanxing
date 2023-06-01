import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Layout } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useNavPage from '../hooks/useNavPage';
import useLoadUserData from '../hooks/useLoadUserData';
const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  // todo 开发时使用，后面删除
  useLoadUserData();
  // 判断路由跳转
  useNavPage();
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>小浩问卷 &copy;2023 - present. CreatedBy denghao</Footer>
    </Layout>
  );
};

export default MainLayout;
