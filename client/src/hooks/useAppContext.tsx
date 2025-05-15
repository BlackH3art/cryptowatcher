import { AppContext, type AppContextType } from "@/context/AppContext";
import { useContext } from "react";

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};