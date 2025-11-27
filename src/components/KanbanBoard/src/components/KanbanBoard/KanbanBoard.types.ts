// src/components/KanbanBoard/KanbanBoard.types.ts
export type Priority = 'low' | 'medium' | 'high';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  assignee?: { id: string; name: string; avatarUrl?: string } | null;
  tags?: string[];
  dueDate?: string; // ISO date string
}

export interface KanbanColumnType {
  id: string;
  title: string;
  wipLimit?: number;
  tasks: KanbanTask[];
}

export interface KanbanBoardProps {
  columns: KanbanColumnType[];
  onChange?: (columns: KanbanColumnType[]) => void;
  className?: string;
}
