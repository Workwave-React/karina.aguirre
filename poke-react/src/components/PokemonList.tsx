import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import PokemonCard from './PokemonCard';
import { getPokemonList } from '../services/pokeApi';

type Pokemon = {
  name: string;
};

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      {pokemon.map((p) => (
        <PokemonCard key={p.name} name={p.name} />
      ))}
    </Stack>
  );
}

export default PokemonList;