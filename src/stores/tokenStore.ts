import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

type State = {
  access: string | undefined;
  refresh: string | undefined;
  _hasHydrated: boolean;
};

type Action = {
  setAccess: (newValue: string | undefined) => void;
  setRefresh: (newValue: string | undefined) => void;
  setHasHydrated: (state: boolean) => void;
};

export type TokenStoreType = State & Action;

export const initTokenStore = (): State => {
  return { access: undefined, refresh: undefined, _hasHydrated: false };
};

export const defaultInitState: State = {
  access: undefined,
  refresh: undefined,
  _hasHydrated: false,
};

const storageOptions: PersistOptions<TokenStoreType> = {
  name: 'token',
  storage: createJSONStorage(() => localStorage),
  onRehydrateStorage: () => (state) => {
    state?.setHasHydrated(true);
  },
};

export const createTokenStore = (initState: State = defaultInitState) => {
  return createStore<TokenStoreType>()(
    persist<TokenStoreType>(
      (set) => ({
        ...initState,
        setAccess: (newValue) => set({ access: newValue }),
        setRefresh: (newValue) => set({ refresh: newValue }),
        setHasHydrated: (state) => set({ _hasHydrated: state }),
      }),
      storageOptions
    )
  );
};
