import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
import { getAllQuestionService } from '../services/question';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar = false, isDeleted = false } = opt;
  const [searchParam] = useSearchParams();

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParam.get(LIST_SEARCH_PARAM_KEY) || '';
      const data = await getAllQuestionService({ keyword, isStar, isDeleted });
      return data;
    },
    {
      // 刷新的依赖
      refreshDeps: [searchParam],
    }
  );
  return {
    data,
    error,
    loading,
  };
}

export default useLoadQuestionListData;
