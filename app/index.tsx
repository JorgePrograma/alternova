import { sortElements } from '@/src/core/utils';
import { View, Text, StyleSheet } from 'react-native';
import '../global.css';
import LoginScreen from '@/src/presentation/screen/login/LoginScreen';

export default function HomeScreen() {

  const arr = [...Array(20)].map(() => {
    return {
      height: Math.floor(Math.random() * 99)
    }
  });

  return (
    <View className='bg-red-500'>
      <Text className='text-green-500 text-xl'>React Native - Alternova</Text>
      {sortElements(arr).map((item, index) => (
        <Text key={index}>{item.height}</Text>
      ))}
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  center: {
    textAlign: 'center'
  }
})
