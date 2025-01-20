// app/(app)/pokemon/[id].tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import PokemonDetailScreen from '@/src/presentation/screen/pokemon/PokemonDetails';

export default function PokemonDetail() {
  const { id, name } = useLocalSearchParams();
  
  const capitalizedName = name 
    ? name.toString().charAt(0).toUpperCase() + name.toString().slice(1) 
    : '';

  return (
    <>
      <Stack.Screen 
       
      />
      <PokemonDetailScreen />
    </>
  );
}
