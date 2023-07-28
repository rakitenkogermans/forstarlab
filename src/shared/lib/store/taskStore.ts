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
    dateAdded: string;
    priority: TaskPriority;
}

const defaultNewTask: Omit<Task, 'id'> = {
    completed: false,
    dateAdded: new Date().toJSON(),
    description: '',
    priority: TaskPriority.LOW,
};

class TaskStore {
    tasks: Task[] = [];
    newTaskForm: Omit<Task, 'id'> = { ...defaultNewTask };
    editTaskForm: Task = {
        id: '',
        completed: false,
        dateAdded: '',
        description: '',
        priority: TaskPriority.LOW,
    };

    isLoading = false;
    error = '';

    sort: TaskSortField = TaskSortField.DATE;
    order: SortOrder = 'asc';
    filter: TaskFilterField = TaskFilterField.ALL;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    startLoading() {
        this.isLoading = true;
    }

    stopLoading() {
        this.isLoading = false;
    }

    setError(error: string) {
        this.error = error;
    }

    resetNewTask() {
        this.newTaskForm = { ...defaultNewTask };
    }

    resetEditTask() {
        this.editTaskForm = {
            id: '',
            completed: false,
            dateAdded: '',
            description: '',
            priority: TaskPriority.LOW,
        };
    }

    async loadTasks() {
        this.startLoading();
        try {
            const { data } = await $api.get<Task[]>('/tasks', {
                params: {
                    userId: this.rootStore.userStore.id,
                },
            });
            this.stopLoading();
            if (data) this.tasks = data;
        } catch (err) {
            this.stopLoading();
            console.log(err);
        }
    }

    async addTask(task: Omit<Task, 'id'>, cb: () => void) {
        this.startLoading();

        try {
            const { data } = await $api.post<Task>(`/tasks`, {
                userId: this.rootStore.userStore.id,
                ...task,
            });
            if (data) {
                this.setError('');
                this.resetNewTask();
                this.stopLoading();
                cb();
            }
        } catch (err) {
            console.log(err);
            this.stopLoading();
            this.setError('Something went wrong');
        }
    }

    async deleteTask(taskId: string) {
        this.startLoading();
        try {
            const { data } = await $api.delete<Task>(`/tasks/${taskId}`);
            this.stopLoading();
            if (data) {
                await this.loadTasks();
            }
        } catch (err) {
            this.stopLoading();
            console.log(err);
        }
    }

    async loadTaskById(taskId: string) {
        this.startLoading();
        try {
            const { data } = await $api.get<Task>(`/tasks/${taskId}`);
            if (data) {
                this.editTaskForm = data;
            }
            this.setError('');
            this.stopLoading();
        } catch (err) {
            this.resetEditTask();
            this.stopLoading();
            this.setError(`Task with id ${taskId} don't exist!`);
        }
    }

    async editTask(task: Task, cb: () => void) {
        this.startLoading();
        try {
            const { data } = await $api.put<Task>(`/tasks/${task.id}`, task);
            this.stopLoading();
            if (data) {
                if (data) {
                    this.stopLoading();
                    cb();
                }
            }
        } catch (err) {
            this.stopLoading();
        }
    }

    async changeCompleteTask(taskId: string) {
        this.startLoading();

        try {
            const existingTask = this.tasks.find((task) => task.id === taskId);
            if (existingTask) {
                const { data } = await $api.put<Task>(`/tasks/${taskId}`, {
                    ...existingTask,
                    completed: !existingTask.completed,
                });
                if (data) {
                    this.stopLoading();
                    await this.loadTasks();
                }
            }
        } catch (err) {
            this.stopLoading();
        }
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
}

export { TaskStore };
