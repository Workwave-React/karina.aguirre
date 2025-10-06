import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { COLORS } from "../constants/colors";

interface LimitSelectorProps {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
}

function LimitSelector({ currentLimit, onLimitChange }: LimitSelectorProps) {
  const [inputValue, setInputValue] = useState(currentLimit.toString());

  useEffect(() => {
    setInputValue(currentLimit.toString());
  }, [currentLimit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyLimit();
    }
  };

  const applyLimit = () => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < 1) {
      setInputValue("10");
      onLimitChange(10);
    } else if (numValue > 100) {
      setInputValue("100");
      onLimitChange(100);
    } else {
      onLimitChange(numValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mb: 3,
      }}
    >
      <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
        Pokémon per page:
      </Typography>
      <TextField
        type="number"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onBlur={applyLimit}
        size="small"
        inputProps={{
          min: 1,
          max: 100,
          style: { textAlign: "center" },
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          width: 80,
          "& .MuiInputBase-input": {
            padding: "6px 8px",
          },
        }}
      />
      <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
        (Press Enter)
      </Typography>
    </Box>
  );
}

export default LimitSelector;