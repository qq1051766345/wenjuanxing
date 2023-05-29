import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY, LIST_PARAM_PAGE_KEY, LIST_PARAM_PAGE_SIZE_KEY } from '../constant';
import { getAllQuestionService } from '../services/question';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar = false, isDeleted = false } = opt;
  const [searchParam] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParam.get(LIST_SEARCH_PARAM_KEY) || '';
      const page = Number(searchParam.get(LIST_PARAM_PAGE_KEY)) || 1;
      const pageSize = Number(searchParam.get(LIST_PARAM_PAGE_SIZE_KEY)) || 10;
      const data = await getAllQuestionService({ keyword, isStar, isDeleted, page, pageSize });
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
    refresh,
  };
}

export default useLoadQuestionListData;
