import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ViewMode = 'grid' | 'list';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  viewMode: ViewMode;
  toggleViewMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, viewMode, toggleViewMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}