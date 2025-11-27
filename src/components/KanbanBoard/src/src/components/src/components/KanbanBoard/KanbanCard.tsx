// src/components/KanbanBoard/KanbanCard.tsx
import React, { useMemo } from 'react';
import type { KanbanTask } from './KanbanBoard.types';

export interface KanbanCardProps {
  task: KanbanTask;
  index: number;
  columnId: string;
  onOpenTask?: (task: KanbanTask, columnId: string) => void;
}

function getPriorityColor(priority?: string) {
  switch (priority) {
    case 'high':
      return 'border-red-500';
    case 'medium':
      return 'border-yellow-500';
    default:
      return 'border-green-400';
  }
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, index, columnId, onOpenTask }) => {
  const priorityClass = useMemo(() => getPriorityColor(task.priority), [task.priority]);

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onOpenTask?.(task, columnId);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Priority ${task.priority ?? 'low'}. Press Enter for details.`}
      onKeyDown={handleKeyDown}
      draggable
      data-task-id={task.id}
      data-task-index={index}
      className={`bg-white border ${priorityClass} border-l-4 rounded-md p-3 mb-3 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 cursor-grab`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium line-clamp-2">{task.title}</h3>
        <div className="text-xs text-gray-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</div>
      </div>
      {task.description ? <p className="text-xs text-gray-600 mt-2 line-clamp-3">{task.description}</p> : null}
      <div className="flex items-center justify-between gap-2 mt-3">
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
              {task.assignee.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
          ) : null}
          <div className="flex gap-1">
            {(task.tags || []).slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-400">#{task.id.slice(0, 4)}</div>
      </div>
    </div>
  );
};
