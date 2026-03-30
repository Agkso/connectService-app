import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red', padding: 50 }}> 
      <Text style={{ color: 'white', fontSize: 20 }}>
        Se este fundo não estiver VERMELHO, o React Native Web não está carregando.
      </Text>
      <Text className="text-yellow-400 font-bold">
        Se este texto não estiver AMARELO, o NativeWind está quebrado.
      </Text>
    </View>
  );
}