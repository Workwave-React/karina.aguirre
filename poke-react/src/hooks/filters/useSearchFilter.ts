import { useMemo } from "react";

export function useSearchFilter(allPokemon: Pokemon[], searchQuery: string): Pokemon[] {
  return useMemo(() => {
    if (!searchQuery) return allPokemon;
    return allPokemon.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allPokemon, searchQuery]);
}
