import React, { FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Typography, Space, Input, Tooltip, message } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EditToolBar from './EditToolBar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changeTitle } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { editQuestionService, updateQuestionService } from '../../../services/question';

const { Title } = Typography;

//显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const disPatch = useDispatch();
  const [editState, setEditState] = useState(false);

  return (
    <Space>
      {!editState && <Title>{title}</Title>}
      {editState && (
        <Input
          value={title}
          onChange={e => disPatch(changeTitle(e.target.value))}
          onPressEnter={() => setEditState(false)}
          onBlur={() => setEditState(false)}
        />
      )}
      <Tooltip title={editState ? '保存标题' : '编辑标题'}>
        <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(!editState)} />
      </Tooltip>
    </Space>
  );
};

// 保存按钮
const SaveButton: FC = () => {
  // pageInfo ComponentList
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id } = useParams();
  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    // 禁用默认事件
    e.preventDefault();
    if (loading) return;
    save();
  });

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('保存成功');
      },
    }
  );

  // 自动保存,防抖
  useDebounceEffect(() => {
    save();
  }, [pageInfo, componentList]);

  return (
    <>
      <Button onClick={save} loading={loading}>
        保存
      </Button>
    </>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  // 本质修改一个属性改为true
  const { run: publish, loading } = useRequest(
    async () => {
      if (!id) return;
      await editQuestionService(id, { inPublished: true });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功');
        nav('/question/stat/' + id);
      },
    }
  );
  return (
    <Button type="primary" onClick={publish} loading={loading}>
      发布
    </Button>
  );
};

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
