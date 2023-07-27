import { makeAutoObservable } from 'mobx';

import { type RootStore } from '@/shared/lib/store/rootStore';

class UserStore {
    name = 'John doe';

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
}

export { UserStore };
