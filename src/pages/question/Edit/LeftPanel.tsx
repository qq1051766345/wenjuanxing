import React, { FC, useMemo } from 'react';
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import ComponentLib from './ComponentLib';
import Layer from './Layer';

const LeftPanel: FC = () => {
  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'componentLib',
        label: (
          <span>
            <AppstoreAddOutlined />
            组件库
          </span>
        ),
        children: <ComponentLib />,
      },
      {
        key: 'layers',
        label: (
          <span>
            <BarsOutlined />
            图层
          </span>
        ),
        children: <Layer />,
      },
    ];
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="componentLib" items={items} />
    </div>
  );
};

export default LeftPanel;
