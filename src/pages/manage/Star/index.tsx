import React, { FC, useEffect, useState } from 'react';
import styles from '../common.module.scss';
import QuestionCard from '../../../components/QuestionCard';
import { useTitle } from 'ahooks';
import { Typography, Empty, Spin } from 'antd';
import ListSearch from '../../../components/ListSearch';
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData';

const { Title } = Typography;

const Star: FC = () => {
  const { data, loading, error } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data || {};
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading && (
        <>
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        </>
      )}
      <div className={styles.content}>
        {list.length === 0 && !loading ? <Empty description="暂无数据"></Empty> : null}
        {/* 星标问卷列表 */}
        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
