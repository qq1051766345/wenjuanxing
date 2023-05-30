import { useSelector } from 'react-redux';
import type { StateType } from '../store';
import { UserStateType } from '../store/userReducer';

const useGetUserInfo = () => {
  const { name, nickname } = useSelector<StateType>(state => state.user) as UserStateType;
  return { name, nickname };
};

export default useGetUserInfo;
