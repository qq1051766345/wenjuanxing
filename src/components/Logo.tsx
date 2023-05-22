import { Space, Typography } from 'antd';
import React, { FC } from 'react';
import { FormOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const logo: FC = () => {
  return (
    <div className={styles.wrap}>
      {/* 点击回到首页 */}
      <Link to={'/'}>
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
