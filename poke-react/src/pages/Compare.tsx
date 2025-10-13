import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import { useCompare } from "../context/CompareContext";
import { getPokemonDetail } from "../services/pokeApi";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { lightTheme, darkTheme } from "../components/constants/theme";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const STAT_COLORS = ["#1976d2", "#dc004e", "#4caf50"];

function Compare() {
  const { compareList, clearCompare } = useCompare();
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useApp();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    if (compareList.length < 2) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const data = await Promise.all(
        compareList.map((name) => getPokemonDetail(name))
      );
      setPokemonData(data);
      setLoading(false);
    };

    fetchData();
  }, [compareList, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  const statNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
  const radarData = statNames.map((statName, index) => {
    const dataPoint: any = { stat: statName };
    pokemonData.forEach((pokemon) => {
      dataPoint[pokemon.name] = pokemon.stats[index].base_stat;
    });
    return dataPoint;
  });

  return (
    <Box py={4} px={2}>
      <Box display="flex" alignItems="center" mb={2}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton aria-label="go back to home">
            <ArrowBackIcon sx={{ color: currentTheme.textPrimary }} />
          </IconButton>
        </Link>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Bungee Shade'",
            color: currentTheme.textPrimary,
            ml: 2,
          }}
        >
          POKEMON COMPARISON
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 800, margin: "0 auto", mb: 4, backgroundColor: currentTheme.cardBackground }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: currentTheme.textPrimary }}>
            Base Stats Comparison
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" />
                <PolarRadiusAxis angle={90} domain={[0, 150]} />
                {pokemonData.map((pokemon, index) => (
                  <Radar
                    key={pokemon.name}
                    name={pokemon.name}
                    dataKey={pokemon.name}
                    stroke={STAT_COLORS[index]}
                    fill={STAT_COLORS[index]}
                    fillOpacity={0.3}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Cards de Pokémon */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        {pokemonData.map((pokemon) => (
          <Card
            key={pokemon.name}
            sx={{
              minWidth: 250,
              maxWidth: 300,
              backgroundColor: currentTheme.cardBackground,
              border: `1px solid ${currentTheme.borderColor}`,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontFamily: "'Bungee Shade'",
                  color: currentTheme.textPrimary,
                  mb: 2,
                }}
              >
                {pokemon.name.toUpperCase()}
              </Typography>
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={120}
                  height={120}
                />
              </Box>
              <Typography sx={{ color: currentTheme.textSecondary, mb: 1 }}>
                Types: {pokemon.types.map((t: any) => t.type.name).join(", ")}
              </Typography>
              <Typography sx={{ color: currentTheme.textSecondary, mb: 2 }}>
                #{pokemon.id.toString().padStart(3, "0")}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: currentTheme.textPrimary, mb: 1 }}>
                Base Stats:
              </Typography>
              {pokemon.stats.map((stat: any) => (
                <Box key={stat.stat.name} display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body2" sx={{ color: currentTheme.textSecondary }}>
                    {stat.stat.name}:
                  </Typography>
                  <Typography variant="body2" sx={{ color: currentTheme.textPrimary, fontWeight: "bold" }}>
                    {stat.base_stat}
                  </Typography>
                </Box>
              ))}

              <Typography sx={{ color: currentTheme.textSecondary, mt: 2 }}>
                Height: {pokemon.height} | Weight: {pokemon.weight}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          onClick={() => {
            clearCompare();
            navigate("/");
          }}
        >
          Clear & Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default Compare;