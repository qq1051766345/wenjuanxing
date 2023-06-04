import React, { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router';
import { useRequest } from 'ahooks';
import { getUserInfoService, loginService } from '../services/user';
import { setToken, setUserInfoToLocal } from '../utils/user-token';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userReducer';

const { Title } = Typography;
const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';
// 保存用户登陆信息
const rememberUser = (username: string, password: string): void => {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};

// 删除用户登陆信息
const deleteUser = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

const getUserInfoFromLocalStorage = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};

const Login: FC = () => {
  const [userInfo, setUserInfo] = useState({ username: '', nickname: '' });
  const [form] = Form.useForm(); //第三方hook
  const nav = useNavigate();
  useEffect(() => {
    const { username, password } = getUserInfoFromLocalStorage();
    if (username && password) {
      form.setFieldsValue({
        username,
        password,
      });
    }
  }, []);

  const dispatch = useDispatch();

  // 加载用户信息
  const loadUserInfo = () => {
    getUserInfoService()
      .then(res => {
        // 导航到主页
        nav(MANAGE_INDEX_PATHNAME);
        setUserInfo(res as any);
        console.log(res, 'userInfo');
        // 存储到localStorage
        setUserInfoToLocal(res);
        dispatch(loginReducer(res as any));
        message.success('登陆成功');
      })
      .catch(err => {
        console.log(err);
        message.error('获取信息失败');
      });
  };

  // 登陆
  const { run: login, loading: loginLoading } = useRequest(
    async values => {
      const { username, password } = values;
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        const { token } = res;
        setToken(token);
        // 获取用户信息
        loadUserInfo();
      },
    }
  );

  const onFinish = (values: any) => {
    const { username, password, remember } = values;
    if (remember) {
      rememberUser(username, password);
    } else {
      console.log('忘记');
    }
    // 执行登陆
    login(values);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登陆</Title>
        </Space>
      </div>
      <div>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                // 字符长度在5-20之间
                type: 'string',
                min: 5,
                max: 20,
                message: '用户名长度在5-20之间',
              },
              {
                pattern: /^\w+$/,
                message: '只能是数字字母下划线',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" wrapperCol={{ offset: 6, span: 16 }} valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loginLoading}>
                登陆
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
