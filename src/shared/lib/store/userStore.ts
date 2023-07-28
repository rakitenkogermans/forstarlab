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

    startLoading() {
        this.isLoading = true;
    }

    stopLoading() {
        this.isLoading = false;
    }

    setError(error: string) {
        this.error = error;
    }

    setUser(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.loggedIn = true;
        this.saveUserToLocalStorage(user);
    }

    saveUserToLocalStorage(user: User) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    }

    clearUser() {
        this.loggedIn = false;
        this.id = '';
        this.username = '';
    }

    async loginByUsername(username: string, password: string) {
        this.startLoading();
        this.setError('');
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
            this.setUser(response.data);
            this.setError('');
            this.stopLoading();
        } catch (err) {
            console.log(err);
            this.stopLoading();
            this.setError('Wrong credentials!');
        }
    }

    initAuthData() {
        const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (user) {
            const parsedUser = JSON.parse(user) as User;
            this.setUser(parsedUser);
        }
        this.initialized = true;
    }

    logout() {
        this.clearUser();
        this.rootStore.taskStore.tasks = [];
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
}

export { UserStore };
