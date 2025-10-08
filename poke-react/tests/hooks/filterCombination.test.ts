import { renderHook } from '@testing-library/react';
import { useTypeFilter } from '../../src/hooks/filters/useTypeFilter';
import { useMoveFilter } from '../../src/hooks/filters/useMoveFilter';
import { Pokemon, PokemonDetail } from '../../src/types/types';

const mockPokemon: Pokemon[] = [
  { name: 'bulbasaur', url: '' },
  { name: 'charmander', url: '' },
  { name: 'pikachu', url: '' },
];

const mockDetails = new Map<string, PokemonDetail>([
  ['bulbasaur', { name: 'bulbasaur', moves: [
      { move: { name: 'tackle', url: '' } },
    ], types: [
      { slot: 1, type: { name: 'grass', url: '' } },
      { slot: 2, type: { name: 'poison', url: '' } },
    ], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['charmander', { name: 'charmander', moves: [
      { move: { name: 'scratch', url: '' } },
    ], types: [{ slot: 1, type: { name: 'fire', url: '' } }], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
  ['pikachu', { name: 'pikachu', moves: [
      { move: { name: 'thunderbolt', url: '' } },
    ], types: [{ slot: 1, type: { name: 'electric', url: '' } }], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } } } as any],
]);

describe('Filter combination', () => {
  it('works correctly across search, type, and move filters', () => {
    const searched = mockPokemon.filter(p => p.name.includes('a'));
    const { result: typeResult } = renderHook(() =>
      useTypeFilter(searched, ['grass', 'fire'], mockDetails)
    );
    const { result: moveResult } = renderHook(() =>
      useMoveFilter(typeResult.current, 'tackle', mockDetails)
    );
    expect(moveResult.current).toHaveLength(1);
    expect(moveResult.current[0].name).toBe('bulbasaur');
  });
});
