export function sortElements<T>(array: T[], key: keyof T): T[] {
  return [...array].sort((a, b) => {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return (a[key] as string).localeCompare(b[key] as string);
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
