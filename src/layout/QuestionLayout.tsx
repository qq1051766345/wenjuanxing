import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const QuestionLayout: FC = () => {
  return (
    <>
      <p>QuestionLayout</p>
      <Outlet />
    </>
  );
};

export default QuestionLayout;
