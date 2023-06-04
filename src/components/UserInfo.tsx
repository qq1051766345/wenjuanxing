import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { removeToken, removeUserInfo } from '../utils/user-token';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../store/userReducer';

const UserInfo: FC = () => {
  const [loading, setLoading] = useState(true);
  const { name, nickname } = useGetUserInfo();
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (name === '') {
      setLoading(true);
      return;
    } else {
      setLoading(false);
    }
  }, [name]);

  function LogOut() {
    removeToken();
    removeUserInfo();
    dispatch(logoutReducer());
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

  return <>{!loading ? UserInfo : <Link to={LOGIN_PATHNAME}>登陆</Link>}</>;
};

export default UserInfo;
