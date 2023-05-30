import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
  useNavPage();
  return (
    <>
      <p>QuestionLayout</p>
      <Outlet />
    </>
  );
};

export default QuestionLayout;
