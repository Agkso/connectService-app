import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
};

export default function Button({ title }: Props) {
  return (
    <TouchableOpacity className="bg-indigo-600 py-4 rounded-xl mt-6 mb-10">
      <Text className="text-white text-center font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}