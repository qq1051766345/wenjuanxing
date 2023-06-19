import React, { FC, useState } from 'react';
import { Button, Space, Tooltip, message } from 'antd';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import {
  copySelectedComponent,
  deleteComponentBySelectedId,
  pasteComponent,
  sortComponent,
  toggleComponentHidden,
  toggleComponentLocked,
} from '../../../store/componentsReducer';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const EditToolBar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; //是否第一个
  const isLast = selectedIndex + 1 >= length; //是否最后一个
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
  // 向上移动
  const moveUp = () => {
    dispatch(sortComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  };

  // 向下移动
  const moveDown = () => {
    dispatch(sortComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  };

  // 撤销
  const undo = () => {
    dispatch(UndoActionCreators.undo());
  };

  // 重做
  const redo = () => {
    dispatch(UndoActionCreators.redo());
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
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={isFirst} />
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined />} onClick={moveDown} disabled={isLast} />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
    </Space>
  );
};

export default EditToolBar;
