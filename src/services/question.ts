import { ComponentInfoType } from '../store/componentsReducer';
import axios, { ResDataType, ResType } from './ajax';
type search = {
  keyword: string;
  page: number; //页数
  pageSize: number; //每页条数
  isStar: boolean;
  isDeleted: boolean;
  inPublished: boolean;
};

type questionInfo = {
  title: string;
  desc: string;
  js: string;
  css: string;
  componentList: ComponentInfoType[];
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

// 修改问卷
export async function editQuestionService(id: string, opt: Partial<search>): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 批量彻底问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = `/api/question/delete`;
  const data = (await axios.delete(url, { data: ids })) as ResDataType;
  return data;
}

// 保存问卷
export async function updateQuestionService(
  id: string,
  opt: Partial<questionInfo>
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}
