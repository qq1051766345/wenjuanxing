import React, { FC } from 'react';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/component';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/component';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';

type PropsType = {
  loading?: boolean;
};

const EditCanvas: FC<PropsType> = props => {
  const { loading } = props;

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      <h1>EditCanvas</h1>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
