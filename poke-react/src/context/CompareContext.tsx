import { createContext, useContext, useState, ReactNode } from "react";

interface CompareContextType {
  compareList: string[];
  addToCompare: (name: string) => void;
  removeFromCompare: (name: string) => void;
  clearCompare: () => void;
  isInCompare: (name: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const addToCompare = (name: string) => {
    if (compareList.length < 3 && !compareList.includes(name)) {
      setCompareList([...compareList, name]);
    }
  };

  const removeFromCompare = (name: string) => {
    setCompareList(compareList.filter((n) => n !== name));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (name: string) => {
    return compareList.includes(name);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return context;
}