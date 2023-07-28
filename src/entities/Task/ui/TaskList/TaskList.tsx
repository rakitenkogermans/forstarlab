import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@/shared/assets/icons/close-20-20.svg';
import DeleteIcon from '@/shared/assets/icons/delete-20-20.svg';
import DoneIcon from '@/shared/assets/icons/done-20-20.svg';
import EditIcon from '@/shared/assets/icons/edit-20-20.svg';
import { getRouteTaskEdit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useStores } from '@/shared/lib/store/rootStore';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './TaskList.module.scss';
import { TaskListSkeleton } from './TaskList.skeleton';
import { TaskFilterField } from '../../model/consts/taskConsts';
import { TaskListItem } from '../TaskListItem/TaskListItem';

interface TaskListProps {
    className?: string;
}

const TaskList = observer((props: TaskListProps) => {
    const { className } = props;
    const { taskStore } = useStores();
    const navigate = useNavigate();

    const onCompleteChange = (id: string) => {
        return () => {
            taskStore.changeCompleteTask(id);
        };
    };

    const onDelete = (id: string) => {
        return () => {
            taskStore.deleteTask(id);
        };
    };

    const onEdit = (id: string) => () => {
        navigate(getRouteTaskEdit(id));
    };

    if (taskStore.isLoading) {
        return (
            <VStack
                max
                gap={'8'}
            >
                <TaskListSkeleton />
                <TaskListSkeleton />
                <TaskListSkeleton />
                <TaskListSkeleton />
                <TaskListSkeleton />
                <TaskListSkeleton />
            </VStack>
        );
    }

    const tasksToRender =
        taskStore.filter === TaskFilterField.ALL
            ? taskStore.tasks
            : taskStore.filterTasksByStatus(taskStore.filter === TaskFilterField.COMPLETED);

    return (
        <ul className={classNames(cls.TaskList, {}, [className])}>
            <VStack
                max
                gap={'8'}
            >
                {tasksToRender.length > 0 ? (
                    tasksToRender.map((task) => {
                        return (
                            <HStack
                                max
                                gap={'16'}
                                key={task.id}
                            >
                                <TaskListItem task={task} />
                                <Button
                                    theme={ButtonTheme.BACKGROUND}
                                    onClick={onCompleteChange(task.id)}
                                    square
                                    size={ButtonSize.L}
                                    className="task_checkbox"
                                >
                                    {task.completed ? <CloseIcon /> : <DoneIcon />}
                                </Button>
                                <Button
                                    theme={ButtonTheme.EDIT}
                                    onClick={onEdit(task.id)}
                                    square
                                    size={ButtonSize.L}
                                >
                                    <EditIcon />
                                </Button>
                                <Button
                                    theme={ButtonTheme.DELETE}
                                    onClick={onDelete(task.id)}
                                    square
                                    size={ButtonSize.L}
                                >
                                    <DeleteIcon />
                                </Button>
                            </HStack>
                        );
                    })
                ) : (
                    <Text title="No tasks created" />
                )}
            </VStack>
        </ul>
    );
});

export { TaskList };
