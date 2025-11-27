// src/components/KanbanBoard/KanbanBoard.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import type { KanbanColumnType } from './KanbanBoard.types';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof KanbanBoard>;

const sampleColumns: KanbanColumnType[] = [
  {
    id: 'todo',
    title: 'To do',
    tasks: [
      { id: 't1', title: 'Design landing page', description: 'Header hero section', priority: 'high', tags: ['ui', 'urgent'], assignee: { id: 'u1', name: 'Asha' }, dueDate: new Date(Date.now() + 86400000).toISOString() },
      { id: 't2', title: 'Write copy for pricing', priority: 'medium', tags: ['copy'] },
    ],
  },
  {
    id: 'inprogress',
    title: 'In progress',
    tasks: [
      { id: 't3', title: 'Integrate payment gateway', description: 'Sandbox keys setup', priority: 'high', assignee: { id: 'u2', name: 'Ravi' } },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 't4', title: 'Set up repo', priority: 'low' },
      { id: 't5', title: 'Initial CI', priority: 'low' },
    ],
  },
];

export const Default: Story = {
  args: {
    columns: sampleColumns,
  },
};

export const EmptyBoard: Story = {
  args: {
    columns: [
      { id: 'one', title: 'Backlog', tasks: [] },
      { id: 'two', title: 'Selected', tasks: [] },
    ],
  },
};

export const ManyTasks: Story = {
  args: {
    columns: [
      {
        id: 'big',
        title: 'Big Column',
        tasks: Array.from({ length: 30 }).map((_, i) => ({
          id: `big-${i}`,
          title: `Task ${i + 1}`,
          description: i % 3 === 0 ? 'Longer description to test clamping and layout' : undefined,
        })),
      },
      { id: 'other', title: 'Other', tasks: [] },
    ],
  },
};
