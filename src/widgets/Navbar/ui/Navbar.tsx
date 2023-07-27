import { observer } from 'mobx-react-lite';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { getRouteLogin, getRouteWelcome } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useStores } from '@/shared/lib/store/rootStore';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const Navbar = observer(({ className = '' }: NavbarProps) => {
    const { userStore } = useStores();

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <AppLink to={getRouteWelcome()}>
                <h1>To-Do List</h1>
            </AppLink>
            <HStack gap={'32'}>
                <ThemeSwitcher />
                {userStore.loggedIn ? (
                    <Text text={`Hi, ${userStore.username}`} />
                ) : (
                    <AppLink to={getRouteLogin()}>Login</AppLink>
                )}
                {userStore.loggedIn && (
                    <Button
                        onClick={() => {
                            userStore.logout();
                        }}
                    >
                        Logout
                    </Button>
                )}
            </HStack>
        </header>
    );
});

export { Navbar };
