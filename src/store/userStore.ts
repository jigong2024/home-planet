import { create } from "zustand";

interface UserState {
  uid: string | null;
  setUid: (uid: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  uid: null,
  setUid: (uid) => set({ uid })
}));
