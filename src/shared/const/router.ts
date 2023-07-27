export enum AppRoutes {
    WELCOME = 'welcome',
    LOGIN = 'login',
    TASKS = 'tasks',
    FORBIDDEN = 'forbidden',

    // last
    NOT_FOUND = 'not_found',
}

export const getRouteWelcome = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteTasks = () => '/tasks';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';
