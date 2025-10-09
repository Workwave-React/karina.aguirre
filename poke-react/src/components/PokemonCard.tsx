import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { getPokemonDetail } from "../services/pokeApi";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { lightTheme, darkTheme } from "./constants/theme";

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const [pokemon, setPokemon] = useState<any>(null);
  const { theme, viewMode } = useApp();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetail(name);
      setPokemon(data);
    };
    fetchData();
  }, [name]);

  if (!pokemon) {
    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: viewMode === "list" ? 400 : 300,
          margin: "8px auto",
          backgroundColor: currentTheme.cardBackground,
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="center">
            <CircularProgress sx={{ color: currentTheme.textPrimary }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: viewMode === "list" ? 400 : 300,
          margin: "8px auto",
          cursor: "pointer",
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.borderColor}`,
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": {
            boxShadow: currentTheme.hoverShadow,
            transform: "scale(1.03)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontFamily: "'Bungee Shade'",
              color: currentTheme.textPrimary,
            }}
          >
            {pokemon.name.toUpperCase()}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            marginBottom={1}
            flexDirection={viewMode === "list" ? "row" : "column"}
            alignItems="center"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{
                width: viewMode === "list" ? "96px" : "120px",
                height: viewMode === "list" ? "96px" : "120px",
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              marginLeft={viewMode === "list" ? 2 : 0}
              marginTop={viewMode === "list" ? 0 : 1}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: currentTheme.textSecondary }}
              >
                Types: {pokemon.types.map((t: any) => t.type.name).join(", ")}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: currentTheme.textHint }}
              >
                #{pokemon.id.toString().padStart(3, "0")}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PokemonCard;
