import { createContext, useContext } from 'react';

import { TaskStore } from './taskStore';
import { UserStore } from './userStore';

export interface RootStateContextValue {
    taskStore: TaskStore;
    userStore: UserStore;
}

export class RootStore {
    public taskStore: TaskStore;
    public userStore: UserStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.taskStore = new TaskStore(this);
    }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
