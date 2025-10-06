import { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Pagination } from "@mui/material";
import PokemonCard from "./PokemonCard";
import LimitSelector from "./pagination/LimitSelector";
import { getPokemonList } from "../services/pokeApi";

type Pokemon = {
  name: string;
};

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const data = await getPokemonList(limit, offset);
        setPokemon(data.results);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [page, limit]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <LimitSelector currentLimit={limit} onLimitChange={handleLimitChange} />

      <Stack spacing={2} alignItems="center" mt={2}>
        {pokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </Stack>

      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Pagination
          count={totalPages}
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