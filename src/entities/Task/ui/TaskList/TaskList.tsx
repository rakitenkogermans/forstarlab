import { observer } from 'mobx-react-lite';

import { TaskListItem } from '@/entities/Task/ui/TaskListItem/TaskListItem';
import DeleteIcon from '@/shared/assets/icons/delete-20-20.svg';
import DoneIcon from '@/shared/assets/icons/done-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import taskStore from '@/shared/lib/store/taskStore';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './TaskList.module.scss';

interface TaskListProps {
    className?: string;
}

const TaskList = observer((props: TaskListProps) => {
    const { className } = props;

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

    return (
        <ul className={classNames(cls.TaskList, {}, [className])}>
            <VStack
                max
                gap={'8'}
            >
                {taskStore.tasks.length > 0 ? (
                    taskStore.tasks.map((task) => {
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
                                    <DoneIcon />
                                </Button>
                                <Button
                                    theme={ButtonTheme.DELETE}
                                    onClick={onDelete(task.id)}
                                    square
                                    size={ButtonSize.L}
                                    className="task_checkbox"
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
