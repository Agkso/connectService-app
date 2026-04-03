import { Text, View } from "react-native";

const variants = {
  success: "bg-indigo-100 text-indigo-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
};

type Props = {
  message: string;
  variant?: keyof typeof variants;
};

export default function StatusBanner({ message, variant = "success" }: Props) {
  return (
    <View className="mt-4">
      <Text className={`${variants[variant]} px-4 py-2 rounded-lg`}>{message}</Text>
    </View>
  );
}