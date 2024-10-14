import { createStore } from 'zustand'

export type Uid = {
  uid: string;
}

export type UidActions = {
  setUserInfo: (uid: string) => void;
  deleteUserInfo: () => void;
}

export type UidStore = Uid & UidActions;

export const defaultInitState: Uid = {
  uid: '',
}

export const createUidStore = (
  initState: Uid = defaultInitState,
) => {
  return createStore<UidStore>()((set) => ({
    ...initState,
    setUserInfo: (uid: string) => set(() => ({ uid })),
    deleteUserInfo: () => set(() => ({ uid: defaultInitState.uid })),
  }))
}

