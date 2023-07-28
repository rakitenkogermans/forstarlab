import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { TaskEditForm } from '@/features/taskEditForm';
import { Page } from '@/widgets/Page';

const TaskEditPage = observer(() => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page data-testid={'TaskEditPage'}>
            <TaskEditForm id={id} />
        </Page>
    );
});

export default TaskEditPage;
