import { renderHook } from '@testing-library/react';
import { useMoveFilter } from '../../src/hooks/filters/useMoveFilter';
import { Pokemon, PokemonDetail } from '../../src/types/types';

const mockPokemon: Pokemon[] = [
  { name: 'bulbasaur', url: '' },
  { name: 'charmander', url: '' },
  { name: 'squirtle', url: '' },
  { name: 'pikachu', url: '' },
];

const mockDetails = new Map<string, PokemonDetail>([
  ['bulbasaur', { name: 'bulbasaur', moves: [
      { move: { name: 'tackle', url: '' } },
    ], types: [], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['charmander', { name: 'charmander', moves: [
      { move: { name: 'ember', url: '' } },
    ], types: [], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['squirtle', { name: 'squirtle', moves: [
      { move: { name: 'tackle', url: '' } },
      { move: { name: 'water-gun', url: '' } },
    ], types: [], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['pikachu', { name: 'pikachu', moves: [
      { move: { name: 'thunderbolt', url: '' } },
    ], types: [], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
]);

describe('useMoveFilter', () => {
  it('returns all when move query empty', () => {
    const { result } = renderHook(() => useMoveFilter(mockPokemon, '', mockDetails));
    expect(result.current).toHaveLength(4);
  });

  it('filters by exact move name', () => {
    const { result } = renderHook(() => useMoveFilter(mockPokemon, 'ember', mockDetails));
    expect(result.current[0].name).toBe('charmander');
  });

  it('filters by partial move (case-insensitive)', () => {
    const { result } = renderHook(() => useMoveFilter(mockPokemon, 'TACKLE', mockDetails));
    const names = result.current.map(p => p.name).sort();
    expect(names).toEqual(['bulbasaur', 'squirtle']);
  });

  it('returns empty when no match', () => {
    const { result } = renderHook(() => useMoveFilter(mockPokemon, 'fly', mockDetails));
    expect(result.current).toHaveLength(0);
  });

  it('excludes missing cache entries', () => {
    const cache = new Map(mockDetails);
    cache.delete('pikachu');
    const { result } = renderHook(() => useMoveFilter(mockPokemon, 'thunderbolt', cache));
    expect(result.current).toHaveLength(0);
  });

  it('handles hyphenated move names', () => {
    const { result } = renderHook(() => useMoveFilter(mockPokemon, 'water-gun', mockDetails));
    expect(result.current[0].name).toBe('squirtle');
  });
});
