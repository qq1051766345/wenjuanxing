import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { LIST_PARAM_PAGE_KEY, LIST_PARAM_PAGE_SIZE_KEY } from '../constant';

interface propsType {
  total: number;
}

const ListPage: FC<propsType> = prop => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchParam] = useSearchParams();
  const { total } = prop;
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const page = Number(searchParam.get(LIST_PARAM_PAGE_KEY)) || 1;
    const pageSize = Number(searchParam.get(LIST_PARAM_PAGE_SIZE_KEY)) || 10;
    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParam]);

  const changeHandle = (page: number, pageSize: number) => {
    // 设置最新的searchParam参数
    searchParam.set('page', String(page));
    searchParam.set('pageSize', String(pageSize));
    nav({
      pathname,
      search: searchParam.toString(),
    });
  };
  return (
    <>
      <Pagination current={current} total={total} pageSize={pageSize} onChange={changeHandle} />
    </>
  );
};

export default ListPage;
