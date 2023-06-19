import React, { FC, useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import { Input, message, Button, Space, Tooltip } from 'antd';
import {
  changComponentHidden,
  changLockHidden,
  changeComponentTitle,
  changeSelectedId,
  sortComponent,
  toggleComponentHidden,
} from '../../../store/componentsReducer';
import styles from './Layer.module.scss';
import classNames from 'classnames';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import SortAbleContainer from '../../../components/DragSortable/SortAbleContainer';
import SortAbleItem from '../../../components/DragSortable/SortAbleItem';

const Layer: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  // 记录当前正在修改标题的组件
  const [changingTitled, setChangingTitled] = useState('');

  //点击选中组件
  const handleSelectComponent = (fe_id: string) => {
    const curComp = componentList.find(item => item.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.warning('该组件已隐藏，无法选中');
      return;
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitled('');
      return;
    } else {
      setChangingTitled(fe_id);
    }
  };

  // 修改组件标题
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle) {
      return;
    }
    if (!selectedId) {
      return;
    }
    dispatch(changeComponentTitle(newTitle));
  };

  // 修改组件隐藏状态
  const changeHiddenHandle = (fe_id: string) => {
    dispatch(changComponentHidden(fe_id));
  };

  const componentListWithId = componentList.map(item => {
    return {
      ...item,
      id: item.fe_id,
    };
  });
  // 拖拽排序结束
  const onDragEnd = (oldIndex: number, newIndex: number) => {
    console.log(oldIndex, newIndex);
    dispatch(sortComponent({ oldIndex, newIndex }));
  };

  return (
    <SortAbleContainer items={componentListWithId} onDragEnd={onDragEnd}>
      {componentList.map(item => {
        const { fe_id, title, isHidden = false, isLocked } = item;

        // 评价titleClassName
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <SortAbleItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => {
                  handleSelectComponent(fe_id);
                }}
              >
                {fe_id === changingTitled && (
                  <Input
                    value={title}
                    onChange={handleChange}
                    onPressEnter={() => setChangingTitled('')}
                    onBlur={() => setChangingTitled('')}
                  ></Input>
                )}
                {fe_id !== changingTitled && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Tooltip title={isHidden ? '取消隐藏' : '隐藏'}>
                    <Button
                      size="small"
                      shape="circle"
                      className={!isHidden ? styles.btn : ''}
                      type={isHidden ? 'primary' : 'text'}
                      icon={<EyeInvisibleOutlined />}
                      onClick={() => {
                        changeHiddenHandle(fe_id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={isLocked ? '取消锁定' : '锁定'}>
                    <Button
                      size="small"
                      shape="circle"
                      className={!isLocked ? styles.btn : ''}
                      type={isLocked ? 'primary' : 'text'}
                      icon={<LockOutlined />}
                      onClick={() => dispatch(changLockHidden(fe_id))}
                    />
                  </Tooltip>
                </Space>
              </div>
            </div>
          </SortAbleItem>
        );
      })}
    </SortAbleContainer>
  );
};

export default Layer;
