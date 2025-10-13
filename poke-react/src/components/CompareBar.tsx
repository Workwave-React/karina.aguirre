import { Box, Button, Chip, Typography } from "@mui/material";
import { useCompare } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { lightTheme, darkTheme } from "./constants/theme";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { theme } = useApp();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: currentTheme.cardBackground,
        borderTop: `2px solid ${currentTheme.borderColor}`,
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        zIndex: 1000,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{ color: currentTheme.textPrimary }}>
        Compare ({compareList.length}/3):
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap">
        {compareList.map((name) => (
          <Chip
            key={name}
            label={name}
            onDelete={() => removeFromCompare(name)}
            sx={{
              backgroundColor: currentTheme.borderColor,
              color: currentTheme.textPrimary,
            }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        disabled={compareList.length < 2}
        startIcon={<CompareArrowsIcon />}
        onClick={() => navigate("/compare")}
      >
        Compare
      </Button>
      <Button variant="outlined" onClick={clearCompare}>
        Clear
      </Button>
    </Box>
  );
}

export default CompareBar;