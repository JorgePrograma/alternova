// app/(app)/pokemon/index.tsx
import { Stack } from 'expo-router';
import PokemonScreen from '@/src/presentation/screen/pokemon/PokemonScreen';

export default function PokemonIndex() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Pokémon',
          headerShown: true 
        }} 
      />
      <PokemonScreen />
    </>
  );
}
