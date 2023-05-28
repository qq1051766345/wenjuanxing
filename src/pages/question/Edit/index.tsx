import React, { FC, useEffect, useState } from 'react';
import { getQuestionService } from '../../../services/question';
import { useParams } from 'react-router-dom';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData();

  return (
    <>
      <h1>edit page</h1>
      <div>{loading ? 'loading....' : JSON.stringify(data)}</div>
    </>
  );
};

export default Edit;
