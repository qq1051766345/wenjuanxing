import axios, { ResDataType, ResType } from './ajax';
type search = {
  keyword: string;
  page: number; //页数
  pageSize: number; //每页条数
  isStar: boolean;
  isDeleted: boolean;
  inPublished: boolean;
};

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = await axios.get(url);
  return data;
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question';
  const data = await axios.post(url);
  return data;
}

// 获取所有问卷列表
export async function getAllQuestionService(opt: Partial<search> = {}): Promise<ResDataType> {
  const url = '/api/question';
  const data = await axios.get(url, { params: opt });
  return data;
}
