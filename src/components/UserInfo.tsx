import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { UserOutlined } from '@ant-design/icons';
import { type } from 'os';
import { Button, message } from 'antd';
import { removeToken } from '../utils/user-token';

const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};
  const nav = useNavigate();

  function LogOut() {
    removeToken();
    nav(LOGIN_PATHNAME);
    message.success('退出成功');
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={LogOut}>
        退出
      </Button>
    </>
  );

  return <>{username ? UserInfo : <Link to={LOGIN_PATHNAME}>登陆</Link>}</>;
};

export default UserInfo;
