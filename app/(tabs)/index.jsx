import { Text, View } from '../../components/Themed';
import { StyleSheet, useColorScheme } from 'react-native';


export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
        <Text>Flash Me</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});