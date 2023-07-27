import { makeAutoObservable } from 'mobx';

import { $api } from '@/shared/api/api';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localstorage';
import { type RootStore } from '@/shared/lib/store/rootStore';

export interface User {
    id: string;
    username: string;
}

class UserStore {
    isLoading = false;
    error = '';
    loggedIn = false;
    id = '';
    username = '';
    initialized = false;

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async loginByUsername(username: string, password: string) {
        this.isLoading = true;
        this.error = '';
        this.loggedIn = false;

        try {
            const response = await $api.post<User>('/login', {
                username,
                password,
            });

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(
                LOCAL_STORAGE_USER_KEY,
                JSON.stringify({ id: response.data.id, username: response.data.username }),
            );
            this.error = '';
            this.isLoading = false;
            this.loggedIn = true;
            this.username = response.data.username;
            this.id = response.data.id;
        } catch (err) {
            console.log(err);
            this.isLoading = false;
            this.error = 'Wrong credentials!';
        }
    }

    initAuthData() {
        const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (user) {
            const parsedUser = JSON.parse(user) as User;
            this.id = parsedUser.id;
            this.username = parsedUser.username;
            this.loggedIn = true;
        }
        this.initialized = true;
    }

    logout() {
        this.loggedIn = false;
        this.id = '';
        this.username = '';
        this.rootStore.taskStore.tasks = [];
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
}

export { UserStore };
