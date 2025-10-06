import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return {
    results: response.data.results,
    count: response.data.count,
  };
};

export const getPokemonDetail = async (name: string) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};
