import React, { FC, useState } from 'react';
import styles from './List.module.scss';
import QuestionCard from '../../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';

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
    isPublished: true,
    isStar: false,
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
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '2020-01-01',
  },
  {
    _id: 'q5',
    title: '问卷5',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '2020-01-01',
  },
];

const List: FC = () => {
  const [searchParam] = useSearchParams();
  console.log('keyword', searchParam.get('keyword'));
  const [list, setList] = useState(rawQuestionsList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {list.map(item => {
          const { _id } = item;
          return <QuestionCard key={_id} {...item}></QuestionCard>;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default List;
