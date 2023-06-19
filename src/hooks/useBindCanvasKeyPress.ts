import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  copySelectedComponent,
  deleteComponentBySelectedId,
  pasteComponent,
  selectLastComponent,
} from '../store/componentsReducer';

function isActiveElementValid() {
  // 获取当前
  const activeElm = document.activeElement;
  if (activeElm == document.body) return true; //没有focus到input元素
  else false;
}

export default function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    // 判断activeElement是否合法
    if (!isActiveElementValid()) return;
    dispatch(deleteComponentBySelectedId());
  });

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    // 判断activeElement是否合法
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    // 判断activeElement是否合法
    if (!isActiveElementValid()) return;
    dispatch(pasteComponent());
  });

  // 选中上一个组件
  useKeyPress(['uparrow'], () => {
    // 判断activeElement是否合法
    if (!isActiveElementValid()) return;
    dispatch(selectLastComponent('up'));
  });

  //选中下一个组件
  useKeyPress(['downarrow'], () => {
    // 判断activeElement是否合法
    if (!isActiveElementValid()) return;
    dispatch(selectLastComponent('down'));
  });
}
