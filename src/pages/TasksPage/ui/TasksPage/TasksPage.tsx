import { memo } from 'react';

import { TaskList } from '@/entities/Task';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

const TasksPage = memo(() => {
    return (
        <Page data-testid={'TasksPage'}>
            <VStack
                max
                gap={'16'}
            >
                <Input />
                <TaskList />
            </VStack>
        </Page>
    );
});

export default TasksPage;
