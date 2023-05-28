import React, { FC, useEffect, useState } from 'react';
import styles from '../common.module.scss';
import QuestionCard from '../../../components/QuestionCard';
import { useTitle, useRequest } from 'ahooks';
import { Spin, Typography } from 'antd';
import ListSearch from '../../../components/ListSearch';
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData';

const { Title } = Typography;
type listData = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
  idDeleted: boolean;
};
const List: FC = () => {
  useTitle('小浩问卷-我的问卷');
  const { data = {}, loading = false } = useLoadQuestionListData();
  const { list, total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {/* 问卷列表 */}
        {list &&
          list.map((item: listData) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多</div>
    </>
  );
};

export default List;
