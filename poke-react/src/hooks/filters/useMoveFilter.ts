import { useMemo } from "react";

export function useMoveFilter(
  filteredPokemon: Pokemon[],
  moveQuery: string,
  detailsCache: Map<string, PokemonDetail>
): Pokemon[] {
  return useMemo(() => {
    if (!moveQuery) return filteredPokemon;

    return filteredPokemon.filter(p => {
      const detail = detailsCache.get(p.name);
      if (!detail) return false;

      return detail.moves.some(m =>
        m.move.name.toLowerCase().includes(moveQuery.toLowerCase())
      );
    });
  }, [filteredPokemon, moveQuery, detailsCache]);
}
