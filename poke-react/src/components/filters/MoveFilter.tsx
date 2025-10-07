import { TextField } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function MoveFilter({ value, onChange }: Props) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Filter by move..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        backgroundColor: "#faf4def4",
        borderRadius: 1,
        minWidth: 250,
        maxWidth: 350,
      }}
    />
  );
}

export default MoveFilter;
