import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useNavPage from '../hooks/useNavPage';
import useLoadUserData from '../hooks/useLoadUserData';

const QuestionLayout: FC = () => {
  useNavPage();
  return (
    <div style={{ height: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;
