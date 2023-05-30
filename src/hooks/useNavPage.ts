import { useEffect } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '../router';

const useNavPage = () => {
  const { pathname } = useLocation();
  const { name } = useGetUserInfo();
  const nav = useNavigate();

  useEffect(() => {
    // 已经登陆的情况下
    if (name !== '') {
      console.log(123213);
      // 如果有name，就跳转到列表页
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
        return;
      }
    } else {
      // 未登陆的情况下
      if (isNoNeedUserInfo(pathname)) {
        return;
      } else {
        nav(LOGIN_PATHNAME);
      }
    }
  }, [name, pathname]);
};

export default useNavPage;
