import React, { FC, useState } from 'react';
import { Button, Space, Tooltip, message } from 'antd';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import {
  copySelectedComponent,
  deleteComponentBySelectedId,
  pasteComponent,
  toggleComponentHidden,
  toggleComponentLocked,
} from '../../../store/componentsReducer';

const EditToolBar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

  // 删除
  const deleteHandle = () => {
    dispatch(deleteComponentBySelectedId());
  };

  // 隐藏组件
  const hideHandle = () => {
    dispatch(toggleComponentHidden({ fe_id: selectedId, isHidden: true }));
  };

  // 锁定/解锁组件
  const lockHandle = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  };

  // 复制
  const copyHandle = () => {
    dispatch(copySelectedComponent());
  };

  // 粘贴
  const pasteHandle = () => {
    // 粘贴事件
    dispatch(pasteComponent());
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={deleteHandle} />
      </Tooltip>
      <Tooltip title="隐藏/显示">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={hideHandle} />
      </Tooltip>
      <Tooltip title={isLocked ? '解锁' : '锁定'}>
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={lockHandle}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copyHandle} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={pasteHandle}
          disabled={copiedComponent == null}
        />
      </Tooltip>
    </Space>
  );
};

export default EditToolBar;
