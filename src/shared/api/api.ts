import axios from 'axios';

import { LOCAL_STORAGE_USER_KEY } from '../const/localstorage';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use(
    (config) => {
        if (config.headers) {
            const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '';
            config.headers.authorization = token;
        }

        return config;
    },

    async (error) => await Promise.reject(error),
);
