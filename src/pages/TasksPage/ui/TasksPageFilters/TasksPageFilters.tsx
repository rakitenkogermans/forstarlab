import { useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { TaskFilterField, TaskSortField } from '@/entities/Task/model/consts/taskConsts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useStores } from '@/shared/lib/store/rootStore';
import { type SortOrder } from '@/shared/types/sort';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { HStack } from '@/shared/ui/Stack';

import cls from './TasksPageFilters.module.scss';

interface TasksPageFiltersProps {
    className?: string;
}

const TasksPageFilters = observer((props: TasksPageFiltersProps) => {
    const { className } = props;
    const { taskStore } = useStores();

    const onChangeSort = (newSort: TaskSortField) => {
        if (newSort === TaskSortField.DATE) {
            taskStore.sortTasksByDate();
        }
        if (newSort === TaskSortField.PRIORITY) {
            taskStore.sortTasksByPriority();
        }
    };

    const onChangeOrder = (newOrder: SortOrder) => {
        taskStore.order = newOrder;
        onChangeSort(taskStore.sort);
    };

    const onChangeFilter = (newFilter: TaskFilterField) => {
        taskStore.filter = newFilter;
        // onChangeSort(taskStore.sort);
    };

    const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(
        () => [
            {
                value: 'asc',
                content: 'Ascending',
            },
            {
                value: 'desc',
                content: 'Descending',
            },
        ],
        [],
    );

    const sortFieldOptions = useMemo<Array<SelectOption<TaskSortField>>>(
        () => [
            {
                value: TaskSortField.DATE,
                content: 'Date added',
            },
            {
                value: TaskSortField.PRIORITY,
                content: 'Priority',
            },
        ],
        [],
    );

    const filterFieldOptions = useMemo<Array<SelectOption<TaskFilterField>>>(
        () => [
            {
                value: TaskFilterField.ALL,
                content: 'All',
            },
            {
                value: TaskFilterField.COMPLETED,
                content: 'Completed',
            },
            {
                value: TaskFilterField.UNCOMPLETED,
                content: 'Uncompleted',
            },
        ],
        [],
    );

    return (
        <div className={classNames(cls.TasksPageFilters, {}, [className])}>
            <HStack
                max
                gap={'16'}
            >
                <Select<TaskSortField>
                    options={sortFieldOptions}
                    label={'Sort BY'}
                    value={taskStore.sort}
                    onChange={onChangeSort}
                />
                <Select<SortOrder>
                    options={orderOptions}
                    label={'Order'}
                    value={taskStore.order}
                    onChange={onChangeOrder}
                />
                <Select<TaskFilterField>
                    options={filterFieldOptions}
                    label={'Filter'}
                    value={taskStore.filter}
                    onChange={onChangeFilter}
                />
            </HStack>
        </div>
    );
});

export { TasksPageFilters };
