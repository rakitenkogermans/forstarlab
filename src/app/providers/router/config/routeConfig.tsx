import { TasksPage } from '@/pages/TasksPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteForbidden,
    getRouteTasks,
    getRouteNotFound,
    getRouteWelcome,
    getRouteLogin,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { WelcomePage } from '@/pages/WelcomePage';
import { LoginPage } from '@/pages/LoginPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.WELCOME]: {
        path: getRouteWelcome(),
        element: <WelcomePage />,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.TASKS]: {
        path: getRouteTasks(),
        element: <TasksPage />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
};
