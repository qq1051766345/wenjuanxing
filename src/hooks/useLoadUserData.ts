import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userReducer';

const useLoadUserData = () => {
  const { name } = useGetUserInfo();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const dispatch = useDispatch();
  const { run: loadUserInfo } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res;
      dispatch(loginReducer({ name: username, nickname }));
    },
    onFinally() {
      // 最后还需要吧状态改为false
      setWaitingUserData(false);
    },
  });

  useEffect(() => {
    // 如果已经有用户信息了，就不用等待了
    if (name != '') setWaitingUserData(false);
    else {
      loadUserInfo();
    }
    // ajax加载用户信息
  }, [name]);

  return { waitingUserData };
};

export default useLoadUserData;
