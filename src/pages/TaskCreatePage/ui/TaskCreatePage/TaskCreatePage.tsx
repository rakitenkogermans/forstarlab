import { TaskCreateForm } from '@/features/taskCreateForm';
import { Page } from '@/widgets/Page';

const TaskCreatePage = () => {
    return (
        <Page data-testid={'TaskCreatePage'}>
            <TaskCreateForm />
        </Page>
    );
};

export default TaskCreatePage;
