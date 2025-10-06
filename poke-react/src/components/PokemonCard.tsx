import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { getPokemonDetail } from "../services/pokeApi";
import { Link } from "react-router-dom";

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetail(name);
      setPokemon(data);
    };
    fetchData();
  }, [name]);

  if (!pokemon) {
    return (
      <Card sx={{ width: "100%", maxWidth: 300, margin: "8px auto" }}>
        <CardContent>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          margin: "8px auto",
          cursor: "pointer",
          minWidth: 400,
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            transform: "scale(1.03)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontFamily: "'Bungee Shade'" }}
          >
            {pokemon.name.toUpperCase()}
          </Typography>
          <Box display="flex" justifyContent="center" marginBottom={1}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              marginLeft={2}
            >
              <Typography variant="subtitle2">
                Types: {pokemon.types.map((t: any) => t.type.name).join(", ")}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PokemonCard;
