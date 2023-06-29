import React, { FC, useRef } from 'react';
import styles from './StatHeader.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, InputRef, Popover, Space, Tooltip, Typography, message } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import QRcode from 'qrcode.react';
const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);
  const copy = () => {
    const elem = urlInputRef.current;
    if (!elem) return;
    elem.select(); //选中input内容
    document.execCommand('copy'); // 拷贝选中内容
    message.success('复制成功');
  };

  const getLinkAndQRCodeElem = () => {
    if (!isPublished) return null;
    const url = `http://localhost:3000/question/${id}`; // 拼接url，需要参考c端的规则

    // 定义二维码组件
    const QRcodeElem = (
      <div>
        <QRcode value={url} size={150}></QRcode>
      </div>
    );
    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: '300px' }}></Input>
        <Tooltip title="复制链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRcodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  };

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" onClick={() => nav(-1)} icon={<LeftOutlined />}>
              返回
            </Button>
            <Title level={4}>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{getLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
