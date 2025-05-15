import { createContext, useState, type ReactNode } from 'react';
import type { User } from "@/types/User";

export interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};