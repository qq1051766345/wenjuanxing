import React, { FC } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

type QuestionCardProps = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
};

const { confirm } = Modal;

const QuestionCard: FC<QuestionCardProps> = props => {
  const { _id, title, isStar, isPublished, createAt, answerCount } = props;
  const nav = useNavigate();
  const copy = () => {
    message.info(123);
  };

  const deleteQuestionCard = () => {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleFilled />,
      onOk: () => console.log(123),
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStar ? <StarOutlined style={{ color: 'red' }} /> : null}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <span style={{ color: 'green' }}>
                  <Tag color="geekblue">已发布</Tag>
                </span>
              ) : (
                <span>
                  <Tag>未发布</Tag>
                </span>
              )}
              <span>答卷：{answerCount}</span>
              {createAt}
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  nav(`/question/edit/${_id}`);
                }}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  nav(`/question/stat/${_id}`);
                }}
                // 没发布就不能统计
                disabled={!isPublished}
              >
                问卷统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                icon={<StarOutlined />}
                type="text"
                size="small"
                style={isStar ? { color: '#1677ff' } : {}}
              >
                {isStar ? '取消标星' : '标星'}
              </Button>
              <Popconfirm title="确定复制该问卷？" okText="Yes" cancelText="No" onConfirm={copy}>
                <Button icon={<CopyOutlined />} type="text" size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={deleteQuestionCard}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
