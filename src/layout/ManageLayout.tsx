import React, { FC } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space, message } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { createQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

const ManageLayout: FC = () => {
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /*  const createList = async () => {
    setLoading(true);
    const data = await createQuestionService();
    const { id } = data;
    if (id) {
      navigate(`/question/edit/${id}`);
      message.success('创建成功');
    } else {
      message.error('创建失败');
    }
    setLoading(false);
  }; */

  const {
    loading,
    error,
    run: createList,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(res) {
      navigate(`/question/edit/${res.id}`);
      message.success('创建成功');
    },
    onError() {
      message.error('创建失败');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={createList}
            loading={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
