import { renderHook } from '@testing-library/react';
import { useTypeFilter } from '../../src/hooks/filters/useTypeFilter';
import { Pokemon, PokemonDetail } from '../../src/types/types';

const mockPokemon: Pokemon[] = [
  { name: 'bulbasaur', url: '' },
  { name: 'charmander', url: '' },
  { name: 'squirtle', url: '' },
  { name: 'pikachu', url: '' },
];

const mockDetails = new Map<string, PokemonDetail>([
  ['bulbasaur', { name: 'bulbasaur', moves: [], types: [
      { slot: 1, type: { name: 'grass', url: '' } },
      { slot: 2, type: { name: 'poison', url: '' } },
    ], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['charmander', { name: 'charmander', moves: [], types: [
      { slot: 1, type: { name: 'fire', url: '' } },
    ], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['squirtle', { name: 'squirtle', moves: [], types: [
      { slot: 1, type: { name: 'water', url: '' } },
    ], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['pikachu', { name: 'pikachu', moves: [], types: [
      { slot: 1, type: { name: 'electric', url: '' } },
    ], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
]);

describe('useTypeFilter', () => {
  it('returns all pokemon when no types selected', () => {
    const { result } = renderHook(() => useTypeFilter(mockPokemon, [], mockDetails));
    expect(result.current).toHaveLength(4);
  });

  it('filters by single type', () => {
    const { result } = renderHook(() => useTypeFilter(mockPokemon, ['fire'], mockDetails));
    expect(result.current[0].name).toBe('charmander');
  });

  it('filters by multiple types (OR logic)', () => {
    const { result } = renderHook(() => useTypeFilter(mockPokemon, ['water', 'electric'], mockDetails));
    const names = result.current.map(p => p.name).sort();
    expect(names).toEqual(['pikachu', 'squirtle']);
  });

  it('excludes pokemon not in cache', () => {
    const cache = new Map(mockDetails);
    cache.delete('squirtle');
    const { result } = renderHook(() => useTypeFilter(mockPokemon, ['water'], cache));
    expect(result.current).toHaveLength(0);
  });

  it('handles multiple types', () => {
    const { result } = renderHook(() => useTypeFilter(mockPokemon, ['poison'], mockDetails));
    expect(result.current[0].name).toBe('bulbasaur');
  });
});
