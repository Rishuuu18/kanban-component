// src/components/KanbanBoard/KanbanColumn.tsx
import React from 'react';
import type { KanbanColumnType, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';

export interface KanbanColumnProps {
  column: KanbanColumnType;
  onTaskDrop: (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
  onTaskOpen?: (task: KanbanTask, columnId: string) => void;
  onAddTask?: (columnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, onTaskDrop, onTaskOpen, onAddTask }) => {
  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

  const handleDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/task-id');
    const fromColumnId = e.dataTransfer.getData('text/from-column-id');
    const toIndex = column.tasks.length;
    if (taskId && fromColumnId) {
      onTaskDrop(taskId, fromColumnId, column.id, toIndex);
    }
  };

  return (
    <section
      role="region"
      aria-label={`${column.title} column, ${column.tasks.length} tasks`}
      className="w-80 min-w-[18rem] bg-gray-50 rounded-md p-3 flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <header className="sticky top-0 bg-gray-50 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{column.title}</h2>
          <div className="text-xs text-gray-500">{column.tasks.length}</div>
        </div>
      </header>

      <div className="mt-3 overflow-auto flex-1">
        {column.tasks.length === 0 ? (
          <div className="text-xs text-gray-400 italic p-6">No tasks. Add one.</div>
        ) : (
          column.tasks.map((t, idx) => (
            <div
              key={t.id}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/task-id', t.id);
                e.dataTransfer.setData('text/from-column-id', column.id);
                e.dataTransfer.setData('text/from-index', String(idx));
                try {
                  const crt = document.createElement('div');
                  crt.style.padding = '6px';
                  crt.style.fontSize = '12px';
                  crt.style.background = 'white';
                  crt.style.border = '1px solid #ccc';
                  crt.textContent = t.title;
                  document.body.appendChild(crt);
                  e.dataTransfer.setDragImage(crt, 10, 10);
                  setTimeout(() => document.body.removeChild(crt), 0);
                } catch {}
              }}
              draggable
            >
              <KanbanCard task={t} index={idx} columnId={column.id} onOpenTask={onTaskOpen} />
            </div>
          ))
        )}
      </div>

      <footer className="mt-3">
        <button
          type="button"
          onClick={() => onAddTask?.(column.id)}
          className="text-sm w-full py-2 rounded-md border border-dashed border-gray-300 text-gray-700"
        >
          + Add task
        </button>
      </footer>
    </section>
  );
};
