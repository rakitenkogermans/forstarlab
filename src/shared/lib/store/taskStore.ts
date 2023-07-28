import { makeAutoObservable } from 'mobx';

import { TaskFilterField, TaskSortField } from '@/entities/Task/model/consts/taskConsts';
import { $api } from '@/shared/api/api';
import { type SortOrder } from '@/shared/types/sort';

import { type RootStore } from './rootStore';

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface Task {
    id: string;
    description: string;
    completed: boolean;
    dateAdded: Date;
    priority: TaskPriority;
}

class TaskStore {
    tasks: Task[] = [];

    isLoading = false;

    sort: TaskSortField = TaskSortField.DATE;
    order: SortOrder = 'asc';
    search = '';
    filter: TaskFilterField = TaskFilterField.ALL;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async loadTasks() {
        this.isLoading = true;
        try {
            const { data } = await $api.get<Task[]>('/tasks', {
                params: {
                    userId: this.rootStore.userStore.id,
                },
            });
            this.isLoading = false;
            this.tasks = data;
        } catch (err) {
            this.isLoading = false;
            console.log(err);
        }
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    async deleteTask(taskId: string) {
        this.isLoading = true;
        try {
            const { data } = await $api.delete<Task>(`/tasks/${taskId}`);
            this.isLoading = false;
            if (data) {
                await this.loadTasks();
            }
        } catch (err) {
            this.isLoading = false;
            console.log(err);
        }

        // this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    editTask(editedTask: Task) {
        this.tasks = this.tasks.map((task) => (task.id === editedTask.id ? editedTask : task));
    }

    async changeCompleteTask(taskId: string) {
        this.isLoading = true;

        try {
            const existingTask = this.tasks.find((task) => task.id === taskId);
            if (existingTask) {
                const { data } = await $api.put<Task>(`/tasks/${taskId}`, {
                    ...existingTask,
                    completed: !existingTask.completed,
                });
                if (data) {
                    this.isLoading = false;
                    await this.loadTasks();
                }
            }
        } catch (err) {
            this.isLoading = false;
            console.log(err);
        }

        // this.tasks = this.tasks.map((task) =>
        //     task.id === taskId ? { ...task, completed: !task.completed } : task,
        // );
    }

    filterTasksByStatus(status: boolean) {
        return this.tasks.filter((task) => task.completed === status);
    }

    sortTasksByDate() {
        this.sort = TaskSortField.DATE;
        this.tasks.sort(
            (a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
        );
        return this.order === 'asc' ? this.tasks : this.tasks.reverse();
    }

    sortTasksByPriority() {
        this.sort = TaskSortField.PRIORITY;
        const priorityLevels = { low: 1, medium: 2, high: 3 };
        this.tasks.sort((a, b) => priorityLevels[a.priority] - priorityLevels[b.priority]);
        return this.order === 'asc' ? this.tasks : this.tasks.reverse();
    }

    filterTasksByDescription(description: string) {
        return this.tasks.filter((task) =>
            task.description.toLowerCase().includes(description.toLowerCase()),
        );
    }
}

export { TaskStore };
