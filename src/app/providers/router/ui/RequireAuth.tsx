import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { getRouteLogin } from '@/shared/const/router';
import { useStores } from '@/shared/lib/store/rootStore';

interface RequireAuthProps {
    children: JSX.Element;
}

const RequireAuth = observer(({ children }: RequireAuthProps) => {
    const {
        userStore: { loggedIn },
    } = useStores();

    if (!loggedIn) {
        return (
            <Navigate
                to={getRouteLogin()}
                replace={true}
            />
        );
    }

    return children;
});

export { RequireAuth };
