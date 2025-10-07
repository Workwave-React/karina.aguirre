type Pokemon = {
  name: string;
  url: string;
};

type PokemonDetail = {
  name: string;
  types: Array<{ type: { name: string } }>;
  moves: Array<{ move: { name: string } }>;
};

type UseFiltersProps = {
  allPokemon: Pokemon[];
  pokemonDetailsCache: Map<string, PokemonDetail>;
  setPokemonDetailsCache: (cache: Map<string, PokemonDetail>) => void;
};

type PokemonType = {
  name: string;
  url: string;
};