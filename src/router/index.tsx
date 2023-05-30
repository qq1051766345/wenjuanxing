import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import ManageLayout from '../layout/ManageLayout';
import QuestionLayout from '../layout/QuestionLayout';
import Home from '../pages/Home';
import Register from '../pages/Register';
import NotFound from '../pages/404';
import List from '../pages/manage/List';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';
import Edit from '../pages/question/Edit';
import Stat from '../pages/question/Stat';
import Login from '../pages/Login';
import path from 'path';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
          {
            path: 'star',
            element: <Star />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
]);

export default router;

// --------------------
// 常用的路由常量
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const HOME_PATHNAME = '/';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  } else {
    return false;
  }
}

export const isNoNeedUserInfo = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  } else {
    return false;
  }
};
