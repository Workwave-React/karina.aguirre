import { Box, CircularProgress, Stack, Pagination, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { usePokemonData } from "../hooks/usePokemonData";
import { usePokemonFilters } from "../hooks/usePokemonFilters";
import FiltersBar from "../components/filters/FiltersBar";
import PokemonCard from "./PokemonCard";
import LimitSelector from "./pagination/LimitSelector";

function PokemonList() {
  const { allPokemon, pokemonTypes, pokemonDetailsCache, setPokemonDetailsCache, loading } = usePokemonData();

  const {
    searchQuery, setSearchQuery,
    selectedTypes, setSelectedTypes,
    moveFilter, setMoveFilter,
    filteredPokemon, isFiltering
  } = usePokemonFilters({ allPokemon, pokemonDetailsCache, setPokemonDetailsCache });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const totalPages = Math.ceil(filteredPokemon.length / limit);
  const start = (page - 1) * limit;
  const displayedPokemon = filteredPokemon.slice(start, start + limit);

  useEffect(() => {
    setPage(1);
  }, [filteredPokemon]);

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
      <FiltersBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pokemonTypes={pokemonTypes}
        selectedTypes={selectedTypes}
        onTypeChange={setSelectedTypes}
        moveFilter={moveFilter}
        onMoveChange={setMoveFilter}
      />

      <Box display="flex" justifyContent="center" mb={2}>
        <LimitSelector currentLimit={limit} onLimitChange={handleLimitChange} />
      </Box>

      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          {isFiltering ? "Filtering..." : `${filteredPokemon.length} Pokémon founded`}
        </Typography>
      </Box>

      {isFiltering ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2} alignItems="center" mt={2}>
          {displayedPokemon.map(p => (
            <PokemonCard key={p.name} name={p.name} />
          ))}
        </Stack>
      )}

      {!isFiltering && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Pagination
            count={totalPages}
            color="primary"
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ "& .MuiPaginationItem-root": { color: "white" } }}
          />
        </Box>
      )}
    </>
  );
}

export default PokemonList;
