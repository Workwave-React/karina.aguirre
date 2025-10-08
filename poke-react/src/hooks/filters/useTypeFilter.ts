import { useMemo } from "react";
import {Pokemon, PokemonDetail} from "../../types/types";

export function useTypeFilter(
  filteredPokemon: Pokemon[],
  selectedTypes: string[],
  detailsCache: Map<string, PokemonDetail>
): Pokemon[] {
  return useMemo(() => {
    if (selectedTypes.length === 0) return filteredPokemon;

    return filteredPokemon.filter(p => {
      const detail = detailsCache.get(p.name);
      if (!detail) return false;
      return detail.types.some(t => selectedTypes.includes(t.type.name));
    });
  }, [filteredPokemon, selectedTypes, detailsCache]);
}
