import { useState, useEffect, useMemo } from "react";
import { getPokemonDetail } from "../services/pokeApi";
import { useSearchFilter } from "./filters/useSearchFilter";
import { useTypeFilter } from "./filters/useTypeFilter";
import { useMoveFilter } from "./filters/useMoveFilter";
import {Pokemon, PokemonDetail} from "../types/types";

type UseFiltersProps = {
  allPokemon: Pokemon[];
  pokemonDetailsCache: Map<string, PokemonDetail>;
  setPokemonDetailsCache: React.Dispatch<React.SetStateAction<Map<string, PokemonDetail>>>;
};

export function usePokemonFilters({
  allPokemon,
  pokemonDetailsCache,
  setPokemonDetailsCache
}: UseFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [moveFilter, setMoveFilter] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  const searchFiltered = useSearchFilter(allPokemon, searchQuery);

  useEffect(() => {
    const fetchDetailsIfNeeded = async () => {
      setIsFiltering(true);

      const needsDetails = selectedTypes.length > 0 || !!moveFilter;
      const toFetch = needsDetails
        ? searchFiltered.filter(p => !pokemonDetailsCache.has(p.name))
        : [];

      if (toFetch.length > 0) {
        const batchSize = 50;
        const updatedCache = new Map(pokemonDetailsCache);

        for (let i = 0; i < toFetch.length; i += batchSize) {
          const batch = toFetch.slice(i, i + batchSize);
          const results = await Promise.all(batch.map(p => getPokemonDetail(p.name)));
          results.forEach(detail => {
            if (detail) updatedCache.set(detail.name, detail);
          });
        }

        setPokemonDetailsCache(updatedCache);
      }

      setIsFiltering(false);
    };

    fetchDetailsIfNeeded();
  }, [searchFiltered, selectedTypes, moveFilter]);

  const typeFiltered = useTypeFilter(searchFiltered, selectedTypes, pokemonDetailsCache);
  const finalFiltered = useMoveFilter(typeFiltered, moveFilter, pokemonDetailsCache);

  useEffect(() => {
    if (!isFiltering) {
      setFilteredPokemon(finalFiltered);
    }
  }, [finalFiltered, isFiltering]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTypes,
    setSelectedTypes,
    moveFilter,
    setMoveFilter,
    filteredPokemon,
    isFiltering,
  };
}
