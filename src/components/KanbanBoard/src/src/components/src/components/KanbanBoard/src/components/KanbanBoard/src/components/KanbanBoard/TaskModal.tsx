// src/components/KanbanBoard/TaskModal.tsx
import React, { useEffect, useRef } from 'react';
import type { KanbanTask } from './KanbanBoard.types';

export interface TaskModalProps {
  open: boolean;
  task?: KanbanTask | null;
  onClose: () => void;
  onSave?: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ open, task, onClose, onSave, onDelete }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => prev?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} tabIndex={-1} className="w-full max-w-xl bg-white rounded-md shadow-lg p-6">
        <div className="flex items-center justify-between">
          <h3 id="task-modal-title" className="text-lg font-semibold">
            {task ? 'Task details' : 'New task'}
          </h3>
          <button onClick={onClose} aria-label="Close dialog" className="text-sm text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <div className="text-xs text-gray-600">Title</div>
            <input defaultValue={task?.title} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <div className="text-xs text-gray-600">Description</div>
            <textarea defaultValue={task?.description} className="w-full border rounded px-2 py-1" />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          {task ? (
            <button
              className="text-sm text-red-600"
              onClick={() => {
                if (task) onDelete?.(task.id);
              }}
            >
              Delete
            </button>
          ) : null}
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              const updated = task ?? { id: Math.random().toString(36).slice(2, 9), title: 'New Task' } ;
              onSave?.(updated as any);
              onClose();
            }}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
