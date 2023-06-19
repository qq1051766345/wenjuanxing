import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import {
  ComponentInfoType,
  changeSelectedId,
  sortComponent,
} from '../../../store/componentsReducer';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';
import SortAbleItem from '../../../components/DragSortable/SortAbleItem';
import SortAbleContainer from '../../../components/DragSortable/SortAbleContainer';

type PropsType = {
  loading?: boolean;
};

// 动态获取组件
export function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  // 拿到对应组件的配置
  const componentConf = getComponentConfigByType(type);
  if (!componentConf) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = props => {
  const dispatch = useDispatch();
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentInfo();
  // 绑定快捷键
  useBindCanvasKeyPress();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    // 阻止事件冒泡
    e.stopPropagation();
    // 修改redux里的id
    dispatch(changeSelectedId(id));
  };

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    );

  const componentListWithId = componentList.map(item => {
    return {
      ...item,
      id: item.fe_id,
    };
  });

  const onDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(sortComponent({ oldIndex, newIndex }));
  };

  return (
    <SortAbleContainer items={componentListWithId} onDragEnd={onDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(item => !item.isHidden)
          .map(item => {
            const { fe_id, isLocked } = item;
            // 拼接className
            const wrapperDefaultClassName = styles['component-wrapper'];
            const selectedClassName = styles.selected;
            const locked = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [locked]: isLocked,
            });

            return (
              <SortAbleItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{getComponent(item)}</div>
                </div>
              </SortAbleItem>
            );
          })}
      </div>
    </SortAbleContainer>
  );
};

export default EditCanvas;
