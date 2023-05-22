import React, { FC, useEffect, useState } from 'react';
import styles from '../common.module.scss';
import QuestionCard from '../../../components/QuestionCard';
import { useTitle } from 'ahooks';
import { Typography, Empty, Table, Tag, Space, Button } from 'antd';
const { Column, ColumnGroup } = Table;
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
    isStar: false,
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

const Trash: FC = () => {
  const [list, setList] = useState(rawQuestionsList);
  useTitle('小浩问卷-回收站');
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>

      <div className={styles.content}>
        {list.length === 0 ? <Empty description="暂无数据"></Empty> : null}
        {/* 星标问卷列表 */}
        {list.length > 0 && (
          <Table dataSource={list} pagination={false} rowKey={q => q._id}>
            <Column title="问卷标题" dataIndex="title" key="title" />
            <Column
              title="是否发布"
              dataIndex="isPublished"
              key="isPublished"
              render={(_, record) => {
                return (
                  <>
                    {(record as any).isPublished ? (
                      <Tag color="green">已发布</Tag>
                    ) : (
                      <Tag color="red">未发布</Tag>
                    )}
                  </>
                );
              }}
            />
            <Column title="问卷数量" dataIndex="answerCount" key="answerCount" />
            <Column title="创建时间" dataIndex="createAt" key="createAt" />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: any) => (
                <Space size="middle">
                  <Button>恢复</Button>
                  <Button danger type="primary">
                    删除
                  </Button>
                </Space>
              )}
            />
          </Table>
        )}
      </div>
    </>
  );
};

export default Trash;
