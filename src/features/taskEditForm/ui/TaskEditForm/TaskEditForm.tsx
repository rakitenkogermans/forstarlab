import { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { getRouteTasks } from '@/shared/const/router';
import { useStores } from '@/shared/lib/store/rootStore';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

interface LoginFormProps {
    className?: string;
}

const TaskEditForm = observer((props: LoginFormProps) => {
    const { className } = props;

    const { userStore } = useStores();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (userStore.loggedIn) {
        return (
            <Navigate
                to={getRouteTasks()}
                replace={true}
            />
        );
    }

    const onChangeUsername = (value: string) => {
        setUsername(value);
    };

    const onChangePassword = (value: string) => {
        setPassword(value);
    };

    const onLoginClick = () => {
        userStore.loginByUsername(username, password).then((r) => {});
    };

    return (
        <VStack
            max
            gap={'16'}
        >
            <Text title={'Authorization form'} />
            {userStore.error && (
                <Text
                    text={'Invalid username or password'}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                onChange={onChangeUsername}
                value={username}
                type="text"
                placeholder={'Type Username'}
                id={'username'}
                name={'username'}
                autoFocus={true}
                autoComplete="off"
            />
            <Input
                onChange={onChangePassword}
                value={password}
                type="password"
                placeholder={'Type Password'}
                id={'password'}
                name={'password'}
                autoComplete="off"
            />
            <Button
                theme={ButtonTheme.BACKGROUND}
                onClick={onLoginClick}
                disabled={userStore.isLoading}
                fullWidth
            >
                {'Login'}
            </Button>
        </VStack>
    );
});

export { TaskEditForm };
