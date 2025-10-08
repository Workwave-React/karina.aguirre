import { renderHook } from '@testing-library/react';
import { useSearchFilter } from '../../src/hooks/filters/useSearchFilter';
import { Pokemon } from '../../src/types/types';

const mockPokemon: Pokemon[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
];

describe('useSearchFilter', () => {
  it('returns all pokemon when search query is empty', () => {
    const { result } = renderHook(() => useSearchFilter(mockPokemon, ''));
    expect(result.current).toHaveLength(4);
  });

  it('filters by exact name', () => {
    const { result } = renderHook(() => useSearchFilter(mockPokemon, 'pikachu'));
    expect(result.current[0].name).toBe('pikachu');
  });

  it('filters by partial name (case-insensitive)', () => {
    const { result } = renderHook(() => useSearchFilter(mockPokemon, 'CHAR'));
    expect(result.current[0].name).toBe('charmander');
  });

  it('returns empty when no match', () => {
    const { result } = renderHook(() => useSearchFilter(mockPokemon, 'mewtwo'));
    expect(result.current).toHaveLength(0);
  });

  it('updates when search query changes', () => {
    const { result, rerender } = renderHook(
      ({ pokemons, query }) => useSearchFilter(pokemons, query),
      { initialProps: { pokemons: mockPokemon, query: '' } }
    );

    rerender({ pokemons: mockPokemon, query: 'squirt' });
    expect(result.current[0].name).toBe('squirtle');
  });
});
