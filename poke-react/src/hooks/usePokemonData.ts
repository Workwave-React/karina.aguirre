import { useState, useEffect } from "react";
import { getAllPokemon, getPokemonTypes, getPokemonDetail } from "../services/pokeApi";
import {Pokemon, PokemonDetail, PokemonType} from "../types/types";

export function usePokemonData() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [pokemonDetailsCache, setPokemonDetailsCache] = useState<Map<string, PokemonDetail>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [pokemonData, typesData] = await Promise.all([
          getAllPokemon(),
          getPokemonTypes()
        ]);
        setAllPokemon(pokemonData);
        setPokemonTypes(typesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return {
    allPokemon,
    pokemonTypes,
    pokemonDetailsCache,
    setPokemonDetailsCache,
    loading
  };
}