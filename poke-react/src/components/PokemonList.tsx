import { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Pagination } from "@mui/material";
import PokemonCard from "./PokemonCard";
import { getPokemonList } from "../services/pokeApi";

type Pokemon = {
  name: string;
};

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const data = await getPokemonList(limit, offset);
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [page]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2} alignItems="center" mt={2}>
        {pokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={20}
          color="primary"
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
          }}
        />
      </Box>
    </>
  );
}

export default PokemonList;
