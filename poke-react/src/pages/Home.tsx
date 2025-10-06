import { Box, Typography } from '@mui/material';
import PokemonList from '../components/PokemonList';

function Home() {
  return (
    <Box mt={4}>
      <Typography variant="h4" align="center">
        Pokémon List
      </Typography>
      <PokemonList />
    </Box>
  );
}

export default Home;
