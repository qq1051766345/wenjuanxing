import { useRequest } from 'ahooks';
import React, { FC, useState } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Pagination, Spin, Table, Typography } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { STAT_PAGE_SIZE } from '../../../constant';
const { Title } = Typography;

type PropsType = {
  selectComponentId: string;
  setSelectComponentId: (id: string) => void;
  setSelectComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = props => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } = props;
  const { id } = useParams();
  const [page, setPage] = useState(1); //当前页码
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE); //每页条数
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
      // 依赖于page和pageSize进行刷新
      refreshDeps: [page, pageSize, id],
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
  const tableElm = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}></div>
      <Pagination
        total={total}
        pageSize={pageSize}
        current={page}
        onChange={page => setPage(page)}
        onShowSizeChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
    </>
  );

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
