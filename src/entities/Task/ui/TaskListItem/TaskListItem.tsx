import { classNames } from '@/shared/lib/classNames/classNames';
import { type Task } from '@/shared/lib/store/taskStore';

import cls from './TaskListItem.module.scss';

interface TaskListItemProps {
    className?: string;
    task: Task;
}

const TaskListItem = (props: TaskListItemProps) => {
    const { className, task } = props;

    return (
        <li className={classNames(cls.TaskListItem, {}, [className, cls[`task_${task.priority}`]])}>
            <div className="task_details">
                <p className="task_description">{task.description}</p>
                <p className="task_date">{new Date(task.dateAdded).toLocaleDateString()}</p>
            </div>
        </li>
    );
};

export { TaskListItem };
