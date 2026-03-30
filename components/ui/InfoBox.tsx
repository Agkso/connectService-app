import { Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export default function InfoBox({ label, value }: Props) {
  return (
    <View className="bg-white p-4 rounded-xl w-[48%] shadow-sm">
      <Text className="text-xs text-gray-400">{label}</Text>
      <Text className="text-lg font-bold text-indigo-600 mt-1">
        {value}
      </Text>
    </View>
  );
}