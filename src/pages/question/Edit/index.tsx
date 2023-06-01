import React, { FC, useEffect, useState } from 'react';
import { getQuestionService } from '../../../services/question';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCanvas from './EditCanvas';

const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData();

  return (
    <div className={styles.container}>
      <div>header</div>
      <div className={styles['container-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>

          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>

          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
