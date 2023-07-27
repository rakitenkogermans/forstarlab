import { LoginForm } from '@/features/AuthByUsername';
import { Page } from '@/widgets/Page';

const LoginPage = () => {
    return (
        <Page data-testid={'TasksPage'}>
            <LoginForm />
        </Page>
    );
};

export default LoginPage;
