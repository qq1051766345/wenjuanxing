import React, { FC, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import { Button, Result, Spin } from 'antd';
import { useTitle } from 'ahooks';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import PageStat from './PageStat';

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished, title } = useGetPageInfo();

  // 状态提示 selectedId,type
  const [selectComponentId, setSelectComponentId] = useState('');
  const [selectComponentType, setSelectComponentType] = useState('');
  const nav = useNavigate();
  // 修改标题
  useTitle(`问卷统计—${title}`);

  const loadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin></Spin>
    </div>
  );

  function getContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          />
        </div>
      );
    }
    return (
      <>
        <div className={style.left}>
          <ComponentList
            selectComponentId={selectComponentId}
            setSelectComponentId={setSelectComponentId}
            setSelectComponentType={setSelectComponentType}
          />
        </div>
        <div className={style.main}>
          <PageStat
            selectComponentId={selectComponentId}
            setSelectComponentId={setSelectComponentId}
            setSelectComponentType={setSelectComponentType}
          />
        </div>
        <div className={style.right}>right</div>
      </>
    );
  }

  return (
    <div className={style.container}>
      <div>
        <StatHeader />
      </div>
      <div className={style['container-wrapper']}>
        {loading && loadingElem}
        {!loading && <div className={style.content}>{getContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;
