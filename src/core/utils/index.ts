export function sortElements<T>(array: T[], key: keyof T): T[] {
  return [...array].sort((a, b) => {
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return (b[key] as number) - (a[key] as number);
    }
    return 0;
  });
}

export const extractPokemonId = (url: string): string => {
  return url.split("/").slice(-2)[0];
};

export const generatePokemonImageUrl = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
