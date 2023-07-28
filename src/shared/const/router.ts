export enum AppRoutes {
    WELCOME = 'welcome',
    LOGIN = 'login',
    TASKS = 'tasks',
    TASK_EDIT = 'task_edit',
    TASK_CREATE = 'task_create',
    FORBIDDEN = 'forbidden',

    // last
    NOT_FOUND = 'not_found',
}

export const getRouteWelcome = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteTasks = () => '/tasks';
export const getRouteTaskEdit = (id: string) => `/tasks/${id}`;
export const getRouteTaskCreate = () => '/tasks/new';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';
