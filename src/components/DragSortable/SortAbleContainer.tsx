import React, { FC } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  //arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type PropsType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};

const SortAbleContainer: FC<PropsType> = props => {
  const { children, items, onDragEnd } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        // 限制鼠标移动的距离，移动过小不会触发拖拽
        distance: 8,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.id === active.id);
      const newIndex = items.findIndex(c => c.id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortAbleContainer;
