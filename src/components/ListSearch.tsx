import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;
const ListSearch: FC = () => {
  const [value, setValue] = useState('');
  const nav = useNavigate();
  // 获取当前路由
  const { pathname } = useLocation();
  const searchHandle = (value: string) => {
    // 跳转页面，增加url参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };

  // 获取url参数，并设置到input中value中
  const [searchParam] = useSearchParams();
  useEffect(() => {
    const newVal = searchParam.get(LIST_SEARCH_PARAM_KEY) || '';
    console.log(newVal, 1111);
    setValue(newVal);
  }, [searchParam]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Search
        value={value}
        placeholder="请输入搜索内容"
        size="large"
        onChange={handleChange}
        onSearch={searchHandle}
        style={{ width: '200px' }}
      />
    </>
  );
};

export default ListSearch;
