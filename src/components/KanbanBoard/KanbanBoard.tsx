// src/components/KanbanBoard/KanbanBoard.tsx
import React, { useCallback, useState } from 'react';
import type { KanbanBoardProps, KanbanTask } from './KanbanBoard.types';
import { useKanbanBoard } from './useKanbanBoard';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from './TaskModal';

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns: initialColumns, onChange, className }) => {
  const { columns, moveTask, addTask, setColumns } = useKanbanBoard(initialColumns);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<{ task?: KanbanTask; columnId?: string } | null>(null);

  const handleTaskDrop = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
      moveTask(taskId, fromColumnId, toColumnId, toIndex);
      onChange?.(columns);
    },
    [moveTask, onChange, columns]
  );

  const handleAddTask = useCallback(
    (columnId: string) => {
      const newTask: KanbanTask = {
        id: Math.random().toString(36).slice(2, 9),
        title: 'New Task',
        description: '',
        priority: 'low',
      };
      addTask(columnId, newTask);
      onChange?.(columns);
    },
    [addTask, onChange, columns]
  );

  const handleOpenTask = useCallback((task: KanbanTask, columnId: string) => {
    setActiveTask({ task, columnId });
    setModalOpen(true);
  }, []);

  return (
    <div className={`w-full overflow-auto ${className ?? ''}`}>
      <div className="flex gap-4 px-4 py-6 items-start">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            onTaskDrop={handleTaskDrop}
            onTaskOpen={handleOpenTask}
            onAddTask={handleAddTask}
          />
        ))}
      </div>

      <TaskModal
        open={modalOpen}
        task={activeTask?.task ?? null}
        onClose={() => {
          setModalOpen(false);
          setActiveTask(null);
        }}
        onSave={(task) => {
          setColumns(
            columns.map((c) =>
              c.id === activeTask?.columnId
                ? { ...c, tasks: c.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)) }
                : c
            )
          );
        }}
        onDelete={(taskId) => {
          setColumns(columns.map((c) => (c.id === activeTask?.columnId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c)));
        }}
      />
    </div>
  );
};
