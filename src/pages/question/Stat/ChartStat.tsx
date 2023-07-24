import React, { FC, useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getComponentStatService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import StatComponent from '../../../components/QuestionComponents/QuestionCheckBox/StatComponent';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = props => {
  const [stat, setStat] = useState([]);
  const { selectedComponentId, selectedComponentType } = props;
  const { id = '' } = useParams();
  const { run } = useRequest(async () => await getComponentStatService(id, selectedComponentId), {
    manual: true,
    onSuccess: res => {
      console.log(res);
      setStat(res.stat);
    },
  });

  useEffect(() => {
    if (selectedComponentId) run();
  }, [id, selectedComponentId]);

  const getStatElem = () => {
    if (!selectedComponentId) return <div>未选中组件</div>;
    // 拿到统计组件
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {};
    if (!StatComponent) return <div>该组件无统计图表</div>;
    return <StatComponent stat={stat} />;
  };

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{getStatElem()}</div>
    </>
  );
};

export default ChartStat;
