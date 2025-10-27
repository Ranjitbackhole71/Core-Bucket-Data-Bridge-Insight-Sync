"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '../hooks/use-theme';
import { useToast } from '../hooks/use-toast';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toasts: any[];
  addToast: (message: string, type: any) => void;
  removeToast: (id: number) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast, removeToast } = useToast();

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};