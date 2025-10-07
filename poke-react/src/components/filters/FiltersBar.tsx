import { Box, Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import TypeFilter from "./TypeFilter";
import MoveFilter from "./MoveFilter";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  pokemonTypes: PokemonType[];
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  moveFilter: string;
  onMoveChange: (value: string) => void;
};

function FiltersBar({
  searchQuery,
  onSearchChange,
  pokemonTypes,
  selectedTypes,
  onTypeChange,
  moveFilter,
  onMoveChange,
}: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <TypeFilter
          types={pokemonTypes}
          selectedTypes={selectedTypes}
          onTypeChange={onTypeChange}
        />
        <MoveFilter value={moveFilter} onChange={onMoveChange} />
      </Stack>
    </Box>
  );
}

export default FiltersBar;
