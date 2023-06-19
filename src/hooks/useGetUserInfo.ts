import { getUserInfo } from '../utils/user-token';

const useGetUserInfo = () => {
  // const { name, nickname } = useSelector<StateType>(state => state.user) as UserStateType;
  const { username, nickname } = getUserInfo();
  const name = username;
  return { name, nickname };
};

export default useGetUserInfo;
