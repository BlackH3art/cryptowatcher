import { createContext, type ReactNode } from 'react';
import { useTokens } from '@/hooks/useTokens';
import type { Token } from '@/types/Token';
import type { QueryObserverResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export interface TokensContextType {
  tokens: Token[];
  refetchTokens: () => Promise<QueryObserverResult<AxiosResponse<Token[], any>>>;
};

export const TokensContext = createContext<TokensContextType | undefined>(undefined);

interface TokenContextProviderProps {
  children: ReactNode;
}

export const TokenContextProvider = ({ children }: TokenContextProviderProps) => {
  const { 
    data: { data: tokens } = { data: [] },
    refetch: refetchTokens, 
  } = useTokens();

  return (
    <TokensContext.Provider value={{
      tokens,
      refetchTokens,
    }}>
      {children}
    </TokensContext.Provider>
  );
};