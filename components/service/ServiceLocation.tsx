import { Text, View } from "react-native";

export default function ServiceLocation({ location }) {
  return (
    <View className="mt-6">
      <Text className="font-semibold mb-2">Localização</Text>

      <View className="bg-white p-4 rounded-xl">
        <Text className="text-gray-700">{location.address}</Text>
        <Text className="text-gray-400 text-sm">
          {location.distance}
        </Text>
      </View>
    </View>
  );
}