import React, { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import {
  ComponentPropType,
  getComponentConfigByType,
} from '../../../components/QuestionComponents';
import { QuestionTitlePropsType } from '../../../components/QuestionComponents/QuestionTitle';
import { useDispatch } from 'react-redux';
import { changeComponentProp } from '../../../store/componentsReducer';

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  // 获取被选中的组件信息
  const { selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();

  if (!selectedComponent) {
    return <NoProp />;
  }

  const { type, props, isLocked = false, isHidden } = selectedComponent;
  // 根据类型拿到配置
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) {
    return <NoProp />;
  }

  const { PropComponent } = componentConfig;

  // 子组件的值变化时，更新store中的值
  const valueChangeHandler = (newProps: ComponentPropType) => {
    if (!selectedComponent) return; //没有组件被选中时，直接不管
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProp({ id: fe_id, newProp: newProps }));
  };

  return (
    <>
      <PropComponent
        {...props}
        disabled={isLocked || isHidden}
        onChange={valueChangeHandler}
      ></PropComponent>
    </>
  );
};

export default ComponentProp;
