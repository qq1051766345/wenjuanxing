import { Space, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router';

const { Title } = Typography;

const logo: FC = () => {
  const { name } = useGetUserInfo();
  const [pathName, setPathName] = useState<string>(HOME_PATHNAME);
  useEffect(() => {
    if (name !== '') {
      // 此时是登陆状态
      setPathName(MANAGE_INDEX_PATHNAME);
    }
  }, [name, pathName]);

  return (
    <div className={styles.wrap}>
      {/* 点击回到首页 */}
      <Link to={pathName}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小浩问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default logo;
