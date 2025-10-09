import { Box, Typography } from "@mui/material";
import PokemonList from "../components/PokemonList";
import { useApp } from "../context/AppContext";
import { lightTheme, darkTheme } from "../components/constants/theme";

function Home() {
  const { theme } = useApp();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Box py={4}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "'Bungee Shade'",
          color: currentTheme.textPrimary,
          textShadow:
            theme === "light"
              ? "2px 2px 4px rgba(0,0,0,0.2)"
              : "2px 2px 4px rgba(0,0,0,0.8)",
          mb: 4,
        }}
      >
        POKEMON LIST
      </Typography>
      <PokemonList />
    </Box>
  );
}

export default Home;
