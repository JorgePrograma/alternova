// app/(app)/index.tsx (tu HomeScreen actual)
import PokemonScreen from '@/src/presentation/screen/pokemon/PokemonScreen';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 bg-emerald-600'>
      <PokemonScreen/>
    </SafeAreaView>
  );
}
