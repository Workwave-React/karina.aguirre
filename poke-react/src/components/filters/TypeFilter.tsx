import { Autocomplete, TextField, Chip } from "@mui/material";

type Props = {
  types: PokemonType[];
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
};

function TypeFilter({ types, selectedTypes, onTypeChange }: Props) {
  return (
    <Autocomplete
      multiple
      size="small"
      options={types.map((t) => t.name)}
      value={selectedTypes}
      onChange={(_, newValue) => onTypeChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Filter by type"
          sx={{
            backgroundColor: "#faf4def4",
            borderRadius: 1,
          }}
        />
      )}
      sx={{ minWidth: 250, maxWidth: 350 }}
    />
  );
}

export default TypeFilter;
