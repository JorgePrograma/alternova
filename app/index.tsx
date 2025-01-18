import { sortElements } from '@/utils';
import { View, Text, StyleSheet } from 'react-native';


export default function HomeScreen() {

  const arr = [...Array(20)].map(() => {
    return {
      height: Math.floor(Math.random() * 99)
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.center}>React Native - Alternova</Text>
      {sortElements(arr).map((item, index) => (
        <Text key={index}>{item.height}</Text>
      ))}
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
