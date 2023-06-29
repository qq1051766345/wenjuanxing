import { useRequest } from 'ahooks';
import React, { FC, useState } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Spin, Table, Typography } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
const { Title } = Typography;

type PropsType = {
  selectComponentId: string;
  setSelectComponentId: (id: string) => void;
  setSelectComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = props => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } = props;
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<Array<any>>([]);
  const { componentList } = useGetComponentInfo();
  if (!id) return null;
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 });
      return res;
    },
    {
      onSuccess(res) {
        const { total, list = [] } = res as any;
        setTotal(total);
        setList(list);
      },
    }
  );

  const columns = componentList.map(c => {
    const { fe_id, title, props = {} } = c;
    const colTitle = props!.title || title;
    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectComponentId(fe_id);
            setSelectComponentType(c.type);
          }}
        >
          <span style={{ color: fe_id === selectComponentId ? '#1890ff' : '' }}>{colTitle}</span>
        </div>
      ),
      dataIndex: fe_id,
      key: fe_id,
    };
  });

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
  const tableElm = <Table columns={columns} dataSource={dataSource} pagination={false}></Table>;

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && tableElm}
    </div>
  );
};

export default PageStat;
