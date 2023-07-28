import { useEffect, useMemo } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { getRouteTasks } from '@/shared/const/router';
import { useStores } from '@/shared/lib/store/rootStore';
import { TaskPriority } from '@/shared/lib/store/taskStore';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

interface LoginFormProps {
    className?: string;
    id?: string;
}

const TaskEditForm = observer((props: LoginFormProps) => {
    const { className, id } = props;

    const { taskStore } = useStores();
    const navigate = useNavigate();

    useEffect(() => {
        taskStore.loadTaskById(id ?? '');
    }, [id, taskStore]);

    const onRedirect = () => {
        navigate(getRouteTasks());
    };

    const onChangeDescription = (value: string) => {
        taskStore.editTaskForm.description = value;
    };

    const onEditTask = () => {
        taskStore.editTask(taskStore.editTaskForm, onRedirect);
    };

    const onChangePriority = (newPriority: TaskPriority) => {
        taskStore.editTaskForm.priority = newPriority;
    };

    const priorityFieldOptions = useMemo<Array<SelectOption<TaskPriority>>>(
        () => [
            {
                value: TaskPriority.LOW,
                content: 'Low',
            },
            {
                value: TaskPriority.MEDIUM,
                content: 'Medium',
            },
            {
                value: TaskPriority.HIGH,
                content: 'High',
            },
        ],
        [],
    );

    if (taskStore.isLoading) {
        return (
            <VStack
                max
                gap={'8'}
            >
                <HStack
                    gap={'16'}
                    max
                >
                    <Skeleton
                        width={'100%'}
                        height={'80px'}
                    />
                    <Skeleton
                        width={'100%'}
                        height={'80px'}
                    />
                </HStack>
                <HStack
                    gap={'16'}
                    max
                >
                    <Skeleton
                        width={'100%'}
                        height={'80px'}
                    />
                    <Skeleton
                        width={'100%'}
                        height={'80px'}
                    />
                </HStack>
            </VStack>
        );
    }

    if (taskStore.error) {
        return (
            <VStack
                max
                gap={'16'}
                className={className}
            >
                <Text title={'Edit task'} />
                {taskStore.error && (
                    <Text
                        text={taskStore.error}
                        theme={TextTheme.ERROR}
                    />
                )}
                <HStack
                    gap={'16'}
                    max
                >
                    <Button
                        theme={ButtonTheme.DELETE}
                        onClick={onRedirect}
                        disabled={taskStore.isLoading}
                        fullWidth
                    >
                        Back to Tasks
                    </Button>
                </HStack>
            </VStack>
        );
    }

    return (
        <VStack
            max
            gap={'16'}
            className={className}
        >
            <Text title={'Edit task'} />
            {taskStore.error && (
                <Text
                    text={taskStore.error}
                    theme={TextTheme.ERROR}
                />
            )}
            <HStack
                gap={'16'}
                max
            >
                <Input
                    onChange={onChangeDescription}
                    value={taskStore.editTaskForm.description}
                    type="text"
                    placeholder={'Type task description'}
                    id={'description'}
                    name={'description'}
                    autoFocus={true}
                    autoComplete="off"
                />
                <Select<TaskPriority>
                    options={priorityFieldOptions}
                    label={'Priority'}
                    value={taskStore.editTaskForm.priority}
                    onChange={onChangePriority}
                />
            </HStack>
            <HStack
                gap={'16'}
                max
            >
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    onClick={onEditTask}
                    disabled={taskStore.isLoading}
                    fullWidth
                >
                    Save
                </Button>
                <Button
                    theme={ButtonTheme.DELETE}
                    onClick={onRedirect}
                    disabled={taskStore.isLoading}
                    fullWidth
                >
                    Cancel
                </Button>
            </HStack>
        </VStack>
    );
});

export { TaskEditForm };
