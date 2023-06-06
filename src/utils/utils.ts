import { ComponentInfoType, ComponentStateType } from '../store/componentsReducer';

/**
 *
 * @param fe_id 当前被选中的id
 * @param componentList 组件列表
 * @returns
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(item => !item.isHidden);
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id);
  if (index < 0) return '';

  // 重新计算选中id
  let newSelectedId = '';
  const length = visibleComponentList.length;
  if (length <= 1) {
    // 元素就一个，删除后没有元素了
    newSelectedId = '';
  } else {
    // 不止一个元素
    if (index + 1 === length) {
      // 删除最后一个元素，选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      // 删除中间的元素，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}

/**
 *
 * @param draft store存的数据
 * @param newComponent 新增的组件
 */
export function insertNewComponent(draft: ComponentStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex(c => c.fe_id === selectedId);
  if (index < 0) {
    // 没找到就在末尾增加组件
    componentList.push(newComponent);
  } else {
    componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
}
