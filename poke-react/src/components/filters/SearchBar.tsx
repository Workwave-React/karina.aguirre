import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
  return (
    <TextField
      fullWidth
      placeholder="Search Pokémon by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        backgroundColor: "#faf4def4",
        borderRadius: 1,
        maxWidth: 600,
      }}
    />
  );
}

export default SearchBar;
