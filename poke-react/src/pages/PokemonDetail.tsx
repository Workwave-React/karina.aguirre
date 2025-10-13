import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Card, CardContent, CircularProgress, Typography, IconButton } from "@mui/material";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getPokemonDetail } from "../services/pokeApi";
import ImageModal from "../components/ImageModalProps";
import { useAudio } from "../hooks/useAudio";
import { VolumeUp } from "@mui/icons-material";

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cryUrl = pokemon?.cries?.latest || pokemon?.cries?.legacy || null;
  const { play, isPlaying } = useAudio(cryUrl);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetail(name!);
      setPokemon(data);
    };
    fetchData();
  }, [name]);

  if (!pokemon) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  const spriteImages = [
    { src: pokemon.sprites.front_default },
    { src: pokemon.sprites.back_default },
    { src: pokemon.sprites.front_shiny },
    { src: pokemon.sprites.back_shiny },
  ];

  return (
    <>
      <Card
        sx={{ maxWidth: 600, margin: "20px auto", padding: 2, opacity: 0.9 }}
      >
        <Box display="flex" alignItems="center">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton aria-label="go back to home">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Box>

        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Typography variant="h4">{pokemon.name.toUpperCase()}</Typography>

            {cryUrl && (
              <IconButton
                onClick={play}
                color={isPlaying ? "primary" : "default"}
                aria-label="play pokemon cry"
              >
                <VolumeUp />
              </IconButton>
            )}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            flexWrap="wrap"
            mt={2}
          >
            {spriteImages.map(
              (sprite, index) =>
                sprite.src && (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(sprite.src)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    <img
                      src={sprite.src}
                      alt={`${pokemon.name} sprite ${index}`}
                      width={100}
                      height={100}
                    />
                  </Box>
                )
            )}
          </Box>
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Base Stats
            </Typography>
            <Box
              sx={{ height: 300, display: "flex", justifyContent: "center" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={pokemon.stats.map((stat: any) => ({
                    stat: stat.stat.name
                      .replace("special-attack", "Sp. Atk")
                      .replace("special-defense", "Sp. Def")
                      .replace("hp", "HP")
                      .replace("attack", "Attack")
                      .replace("defense", "Defense")
                      .replace("speed", "Speed"),
                    value: stat.base_stat,
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis angle={90} domain={[0, 150]} />
                  <Radar
                    name={pokemon.name}
                    dataKey="value"
                    stroke="#1976d2"
                    fill="#1976d2"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography>
              Types: {pokemon.types.map((t: any) => t.type.name).join(", ")}
            </Typography>
            <Typography>
              Abilities:{" "}
              {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
            </Typography>
            <Box mt={2}>
              <Typography>Moves ({pokemon.moves.length}):</Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {pokemon.moves.slice(0, 10).map((m: any, index: number) => (
                  <Typography
                    key={index}
                    sx={{
                      bgcolor: "rgba(25, 118, 210, 0.1)",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.875rem",
                    }}
                  >
                    {m.move.name}
                  </Typography>
                ))}
                {pokemon.moves.length > 10 && (
                  <Typography sx={{ color: "#aaa", alignSelf: "center" }}>
                    +{pokemon.moves.length - 10} more
                  </Typography>
                )}
              </Box>
            </Box>
            <Typography>
              Height: {pokemon.height} | Weight: {pokemon.weight}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <ImageModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}

export default PokemonDetail;
