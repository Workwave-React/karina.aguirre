export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  name: string;
  types: Array<{ type: { name: string } }>;
  moves: Array<{ move: { name: string } }>;
};

export type UseFiltersProps = {
  allPokemon: Pokemon[];
  pokemonDetailsCache: Map<string, PokemonDetail>;
  setPokemonDetailsCache: (cache: Map<string, PokemonDetail>) => void;
};

export type PokemonType = {
  name: string;
  url: string;
};