import { type ReactNode, createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import {
  type TokenStoreType,
  createTokenStore,
  initTokenStore,
} from '../stores/tokenStore';

export type TokenStoreApi = ReturnType<typeof createTokenStore>;

export const TokenStoreContext = createContext<TokenStoreApi | undefined>(
  undefined
);

export interface TokenStoreProviderProps {
  children: ReactNode;
}

export const TokenStoreProvider = ({ children }: TokenStoreProviderProps) => {
  const storeRef = useRef<TokenStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTokenStore(initTokenStore());
  }

  return (
    <TokenStoreContext.Provider value={storeRef.current}>
      {children}
    </TokenStoreContext.Provider>
  );
};

export const useTokenStore = <T,>(
  selector: (store: TokenStoreType) => T
): T => {
  const tokenStoreContext = useContext(TokenStoreContext);

  if (!tokenStoreContext) {
    throw new Error(`useTokenStore must be used within TokenStoreProvider`);
  }

  return useStore(tokenStoreContext, selector);
};
