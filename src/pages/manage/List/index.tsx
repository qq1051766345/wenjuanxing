import React, { FC, useEffect, useState } from 'react';
import styles from '../common.module.scss';
import QuestionCard from '../../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Typography } from 'antd';
import ListSearch from '../../../components/ListSearch';

const { Title } = Typography;

const rawQuestionsList = [
  {
    _id: 'q1', //和mongoDb中的id一致
    title: '问卷1',
    isPublished: true,
    isStar: false,
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
    isStar: false,
    answerCount: 5,
    createAt: '2020-01-01',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: false,
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

const List: FC = () => {
  const [searchParam] = useSearchParams();
  const [list, setList] = useState(rawQuestionsList);
  useTitle('小浩问卷-我的问卷');
  useEffect(() => {
    console.log('keyword', searchParam.get('keyword'));
  });

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
      <div className={styles.content}>
        {/* 问卷列表 */}
        {list &&
          list.map(item => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多</div>
    </>
  );
};

export default List;
