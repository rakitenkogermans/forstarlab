export enum AppRoutes {
    TASKS = 'tasks',
    FORBIDDEN = 'forbidden',

    // last
    NOT_FOUND = 'not_found',
}

export const getRouteTasks = () => '/';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';
