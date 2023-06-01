import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useDispatch } from 'react-redux';
import { ComponentListType, reset } from '../store/componentsReducer';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { data, loading, run, error } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('问卷id不能为空');

      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  //根据data设置redux store
  useEffect(() => {
    if (!data) return;
    const { title = '', componentList = [] } = data;
    // 存储到redux store中
    dispatch(reset({ componentList }));
  }, [data]);

  // 判断id变化，执行加载ajax数据
  useEffect(() => {
    run(id);
  }, [id]);
  return {
    loading,
    error,
  };
};

export default useLoadQuestionData;
