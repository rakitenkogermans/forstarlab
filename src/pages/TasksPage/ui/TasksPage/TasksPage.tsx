import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { TaskList } from '@/entities/Task';
import { TasksPageFilters } from '@/pages/TasksPage/ui/TasksPageFilters/TasksPageFilters';
import { useStores } from '@/shared/lib/store/rootStore';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

const TasksPage = observer(() => {
    const { taskStore } = useStores();

    useEffect(() => {
        taskStore.loadTasks();
    }, [taskStore]);

    return (
        <Page data-testid={'TasksPage'}>
            <VStack
                max
                gap={'16'}
            >
                <TasksPageFilters />
                <TaskList />
            </VStack>
        </Page>
    );
});

export default TasksPage;
