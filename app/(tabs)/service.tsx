import { serviceMock } from "@/constants/mock";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Services() {
  const data = [serviceMock, serviceMock, serviceMock];

  return (
    <View className="flex-1 bg-zinc-100 p-4">
      <TouchableOpacity
        onPress={() => router.push('/criar-servico')}
        className="bg-indigo-600 p-4 rounded-xl mb-4"
      >
        <Text className="text-white text-center font-bold">Botão de Teste: Ir para Criar Serviço (UC04)</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => router.push(`/service/${index}`)}
            className="bg-white p-4 rounded-xl mb-4"
          >
            <Text className="font-bold text-lg">{item.title}</Text>
            <Text className="text-gray-500">{item.client}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}