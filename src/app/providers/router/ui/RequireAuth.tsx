import { useMemo } from 'react';

import { Navigate } from 'react-router-dom';

import { getRouteForbidden, getRouteTasks } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: any[];
}

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const isAuth = 1;
    const userRoles = 1;

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        // return roles.some((requiredRole) => userRoles?.includes(requiredRole));
    }, [roles]);

    if (!isAuth) {
        return (
            <Navigate
                to={getRouteTasks()}
                replace={true}
            />
        );
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                replace={true}
            />
        );
    }

    return children;
};

export { RequireAuth };
