"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type UidStore, createUidStore } from "@/stores/loginStore";

export type CounterStoreApi = ReturnType<typeof createUidStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
  uid?: string; // Accept uid as a prop
}

export const CounterStoreProvider = ({
  children,
  uid = "" // Default to an empty string if uid  is not provided
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createUidStore(); // Initialize the store

    // Set the user info if uid is provided
    if (uid) {
      storeRef.current.getState().setUserInfo(uid);
    }
  }

  return <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>;
};

export const useCounterStore = <T,>(selector: (store: UidStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
