import { type FC, useEffect } from 'react';

import '@/app/styles/index.scss';
import { observer } from 'mobx-react-lite';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useStores } from '@/shared/lib/store/rootStore';

import { AppRouter } from './providers/router';

const App: FC = observer(() => {
    const { theme } = useTheme();
    const { userStore } = useStores();

    useEffect(() => {
        if (!userStore.loggedIn) {
            userStore.initAuthData();
        }
    }, [userStore, userStore.loggedIn]);

    return (
        <div className={classNames('app', {}, [theme])}>
            {userStore.initialized && <AppRouter />}
        </div>
    );
});

export { App };
