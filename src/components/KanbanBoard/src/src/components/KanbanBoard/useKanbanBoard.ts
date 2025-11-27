// src/components/KanbanBoard/useKanbanBoard.ts
import { useCallback, useState } from 'react';
import type { KanbanColumnType, KanbanTask } from './KanbanBoard.types';

export function useKanbanBoard(initialColumns: KanbanColumnType[]) {
  const [columns, setColumns] = useState<KanbanColumnType[]>(initialColumns);

  const findColumnIndex = useCallback(
    (columnId: string) => columns.findIndex((c) => c.id === columnId),
    [columns]
  );

  const moveTask = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
      setColumns((prev) => {
        const fromIdx = prev.findIndex((c) => c.id === fromColumnId);
        const toIdx = prev.findIndex((c) => c.id === toColumnId);
        if (fromIdx === -1 || toIdx === -1) return prev;

        const fromCol = { ...prev[fromIdx] };
        const toCol = { ...prev[toIdx] };

        const taskIndex = fromCol.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return prev;

        const [task] = fromCol.tasks.splice(taskIndex, 1);
        const insertIndex = Math.max(0, Math.min(toCol.tasks.length, toIndex));
        toCol.tasks.splice(insertIndex, 0, task);

        const next = [...prev];
        next[fromIdx] = fromCol;
        next[toIdx] = toCol;
        return next;
      });
    },
    []
  );

  const reorderWithinColumn = useCallback(
    (columnId: string, fromIndex: number, toIndex: number) => {
      setColumns((prev) => {
        const colIdx = prev.findIndex((c) => c.id === columnId);
        if (colIdx === -1) return prev;
        const col = { ...prev[colIdx] };
        const [task] = col.tasks.splice(fromIndex, 1);
        col.tasks.splice(toIndex, 0, task);
        const next = [...prev];
        next[colIdx] = col;
        return next;
      });
    },
    []
  );

  const addTask = useCallback((columnId: string, task: KanbanTask) => {
    setColumns((prev) => {
      const idx = prev.findIndex((c) => c.id === columnId);
      if (idx === -1) return prev;
      const copy = [...prev];
      const col = { ...copy[idx], tasks: [task, ...copy[idx].tasks] };
      copy[idx] = col;
      return copy;
    });
  }, []);

  const updateColumns = useCallback((updater: KanbanColumnType[]) => {
    setColumns(updater);
  }, []);

  return {
    columns,
    setColumns: updateColumns,
    findColumnIndex,
    moveTask,
    reorderWithinColumn,
    addTask,
  };
}
