import { memo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useStores } from '@/shared/lib/store/rootStore';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

import cls from './TasksPageFilters.module.scss';

interface TasksPageFiltersProps {
    className?: string;
}

const TasksPageFilters = memo((props: TasksPageFiltersProps) => {
    const { className } = props;
    const { taskStore } = useStores();
    const [descriptionFilter, setDescriptionFilter] = useState('');

    const handleFilterDescription = () => {
        taskStore.filterTasksByDescription(descriptionFilter);
    };

    const onDescriptionChange = (description: string) => {
        setDescriptionFilter(description);
    };

    return (
        <div className={classNames(cls.TasksPageFilters, {}, [className])}>
            <HStack
                max
                gap={'16'}
            >
                <Input
                    placeholder={'Search...'}
                    value={descriptionFilter}
                    onChange={onDescriptionChange}
                />
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    size={ButtonSize.M}
                    onClick={handleFilterDescription}
                >
                    Filter
                </Button>
            </HStack>
        </div>
    );
});

export { TasksPageFilters };
