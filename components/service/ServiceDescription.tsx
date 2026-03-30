import { Text, View } from "react-native";

export default function ServiceDescription({ description }) {
  return (
    <View className="mt-6">
      <Text className="font-semibold mb-2">Descrição Completa</Text>

      <View className="bg-white p-4 rounded-xl">
        <Text className="text-gray-600">{description}</Text>
      </View>
    </View>
  );
}