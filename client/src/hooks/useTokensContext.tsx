import { TokensContext, type TokensContextType } from '@/context/TokensContext';
import { useContext } from 'react';

export const useTokensContext = (): TokensContextType => {
  const context = useContext(TokensContext);
  if (context === undefined) {
    throw new Error('useTokensContext must be used within an TokensContextProvider');
  }
  return context;
};