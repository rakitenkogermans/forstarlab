import { lazy } from 'react';

export const TasksPageLazy = lazy(async () => await import('./TasksPage'));
