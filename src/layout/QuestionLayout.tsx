import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useNavPage from '../hooks/useNavPage';
import useLoadUserData from '../hooks/useLoadUserData';

const QuestionLayout: FC = () => {
  // todo 开发时使用，后面删除
  useLoadUserData();
  useNavPage();
  return (
    <div style={{ height: '100vh' }}>
      <p>QuestionLayout</p>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;
