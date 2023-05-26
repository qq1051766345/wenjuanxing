import React, { FC, useEffect, useState } from 'react';
import styles from '../common.module.scss';
import QuestionCard from '../../../components/QuestionCard';
import { useTitle } from 'ahooks';
import { Typography, Empty } from 'antd';
import ListSearch from '../../../components/ListSearch';

const { Title } = Typography;

const rawQuestionsList = [
  {
    _id: 'q1', //和mongoDb中的id一致
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '2020-01-01',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '2020-01-01',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '2020-01-01',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '2020-01-01',
  },
  {
    _id: 'q5',
    title: '问卷5',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '2020-01-01',
  },
];

const Star: FC = () => {
  const [list, setList] = useState(rawQuestionsList);
  useTitle('小浩问卷-星标问卷');
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

      <div className={styles.content}>
        {list.length === 0 ? <Empty description="暂无数据"></Empty> : null}
        {/* 星标问卷列表 */}
        {list.length > 0 &&
          list.map(item => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
