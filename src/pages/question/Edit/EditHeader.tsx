import React, { FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Typography, Space, Input, Tooltip } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolBar from './EditToolBar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changeTitle } from '../../../store/pageInfoReducer';

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
  return (
    <>
      <Button>保存</Button>
    </>
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
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
