import React, { FC, useEffect, useState } from 'react';
import styles from '../common.module.scss';
import { useRequest, useTitle } from 'ahooks';
import { Typography, Empty, Table, Tag, Space, Button, Spin, message } from 'antd';
import ListSearch from '../../../components/ListSearch';
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData';
import ListPage from '../../../components/ListPage';
import { deleteQuestionService, editQuestionService } from '../../../services/question';
const { Column } = Table;
const { Title } = Typography;

const Trash: FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { data, loading, error, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data || {};
  useTitle('小浩问卷-回收站');

  // 恢复问卷
  const { run: restore, loading: restoreLoading } = useRequest(
    async () => {
      for await (const id of selectedRowKeys) {
        await editQuestionService(String(id), { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功');
        // 手动刷新列表
        refresh();
      },
      debounceWait: 500, //防抖
    }
  );

  // 彻底删除
  const { run: completeDelete, loading: deleteLoading } = useRequest(
    async () => deleteQuestionService(selectedRowKeys),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功');
        refresh();
      },
    }
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <>
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          </>
        )}
        {list.length === 0 && !loading ? <Empty description="暂无数据"></Empty> : null}
        {/* 星标问卷列表 */}
        {list.length > 0 && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <Space>
                <Button
                  type="primary"
                  disabled={!selectedRowKeys.length || restoreLoading}
                  onClick={restore}
                >
                  恢复
                </Button>
                <Button
                  danger
                  type="primary"
                  disabled={!selectedRowKeys.length || deleteLoading}
                  onClick={completeDelete}
                >
                  彻底删除
                </Button>
              </Space>
            </div>
            <Table
              dataSource={list}
              pagination={false}
              rowKey={q => q._id}
              rowSelection={{
                type: 'checkbox',
                onChange: (newSelectedRowKeys: any) => {
                  setSelectedRowKeys(newSelectedRowKeys);
                },
              }}
            >
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
              <Column title="创建时间" dataIndex="createdAt" key="createdAt" />
            </Table>
          </>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        {/* 分页 */}
        {list.length > 0 && (
          <div className={styles.footer}>
            <ListPage total={total} />
          </div>
        )}
      </div>
    </>
  );
};

export default Trash;
