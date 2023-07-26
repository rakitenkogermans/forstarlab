import { makeAutoObservable } from 'mobx';

export interface Task {
    id: string;
    description: string;
    completed: boolean;
    dateAdded: Date;
    priority: 'low' | 'medium' | 'high';
}

class TaskStore {
    tasks: Task[] = [
        {
            id: '1',
            description: 'Task 1',
            completed: false,
            dateAdded: new Date(),
            priority: 'low',
        },
        {
            id: '2',
            description: 'Task 2',
            completed: true,
            dateAdded: new Date(),
            priority: 'high',
        },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    deleteTask(taskId: string) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    editTask(editedTask: Task) {
        this.tasks = this.tasks.map((task) => (task.id === editedTask.id ? editedTask : task));
    }

    changeCompleteTask(taskId: string) {
        this.tasks = this.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
        );
    }

    filterTasksByStatus(status: boolean) {
        return this.tasks.filter((task) => task.completed === status);
    }

    sortTasksByDate() {
        return this.tasks.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime());
    }

    sortTasksByPriority() {
        const priorityLevels = { low: 1, medium: 2, high: 3 };
        return this.tasks.sort((a, b) => priorityLevels[a.priority] - priorityLevels[b.priority]);
    }
}

export default new TaskStore();
