import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { type Task } from '@/shared/lib/store/taskStore';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';

import cls from './TaskListItem.module.scss';

interface TaskListItemProps {
    className?: string;
    task: Task;
}

const TaskListItem = (props: TaskListItemProps) => {
    const { className, task } = props;

    return (
        <li
            className={classNames(cls.TaskListItem, { [cls.completed]: task.completed }, [
                className,
            ])}
        >
            <div className="task_details">
                <p className="task_description">{task.description}</p>
                <HStack gap={'8'}>
                    <Icon Svg={CalendarIcon} />
                    <p className="task_date">{new Date(task.dateAdded).toLocaleDateString()}</p>
                </HStack>
            </div>
            <div className={cls[`task_${task.priority}`]} />
        </li>
    );
};

export { TaskListItem };
