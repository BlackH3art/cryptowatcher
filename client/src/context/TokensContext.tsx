import { createContext, type ReactNode } from 'react';
import { useTokens } from '@/hooks/useTokens';
import type { Token } from '@/types/Token';
import type { QueryObserverResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useTotalValue } from '@/hooks/useTotalValue';

export interface TokensContextType {
  tokens: Token[];
  refetchTokens: () => Promise<QueryObserverResult<AxiosResponse<Token[], any>>>;
  total: number;
  refetchTotal: () => Promise<QueryObserverResult<AxiosResponse<{ total: number }, any>>>;
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

  const {
    data: { data } = { data: { total: 0 }},
    refetch: refetchTotal,
  } = useTotalValue();

  return (
    <TokensContext.Provider value={{
      tokens,
      refetchTokens,
      total: data.total,
      refetchTotal,
    }}>
      {children}
    </TokensContext.Provider>
  );
};