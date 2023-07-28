import { useMemo } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { getRouteTasks } from '@/shared/const/router';
import { useStores } from '@/shared/lib/store/rootStore';
import { TaskPriority } from '@/shared/lib/store/taskStore';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

interface LoginFormProps {
    className?: string;
}

const TaskCreateForm = observer((props: LoginFormProps) => {
    const { className } = props;

    const { taskStore } = useStores();
    const navigate = useNavigate();

    const onRedirect = () => {
        navigate(getRouteTasks());
    };

    const onChangeDescription = (value: string) => {
        taskStore.newTaskForm.description = value;
    };

    const onCreateTask = () => {
        taskStore.addTask(taskStore.newTaskForm, onRedirect);
    };

    const onChangePriority = (newPriority: TaskPriority) => {
        taskStore.newTaskForm.priority = newPriority;
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

    return (
        <VStack
            max
            gap={'16'}
            className={className}
        >
            <Text title={'Create new task'} />
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
                    value={taskStore.newTaskForm.description}
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
                    value={taskStore.newTaskForm.priority}
                    onChange={onChangePriority}
                />
            </HStack>
            <HStack
                gap={'16'}
                max
            >
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    onClick={onCreateTask}
                    disabled={taskStore.isLoading}
                    fullWidth
                >
                    Create
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

export { TaskCreateForm };
