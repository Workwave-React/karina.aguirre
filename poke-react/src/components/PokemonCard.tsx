import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { getPokemonDetail } from "../services/pokeApi";

type Props = {
  name: string;
};

function PokemonCard({ name }: Props) {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetail(name);
      console.log(data);
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
    <Card sx={{ width: "100%", maxWidth: 500, margin: "8px auto" }}>
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
            <Typography variant="subtitle2">
              Habilities:{" "}
              {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
            </Typography>
            <Typography variant="subtitle2">
              Height: {pokemon.height} Weight: {pokemon.weight}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
