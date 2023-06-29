import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useDispatch } from 'react-redux';
import { ComponentStateType, reset } from '../store/componentsReducer';
import { resetPageInfo } from '../store/pageInfoReducer';

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
    const {
      title = '',
      componentList = [],
      desc = '',
      css = '',
      js = '',
      isPublished = false,
    } = data;
    // 存储到redux store中
    // 设置默认的selectedId
    let selectedId = '';
    if (componentList.length > 0) {
      // 默认设置第一个组件为选中
      selectedId = componentList[0].fe_id;
    }
    // pageList 村搭配redux store中
    dispatch(reset({ componentList, selectedId, copiedComponent: null }));

    // 把pageInfo存储到redux store中
    dispatch(resetPageInfo({ title, desc, css, js, isPublished }));
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
