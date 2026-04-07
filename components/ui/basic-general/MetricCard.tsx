import { Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
  valueClassName?: string;
};

export default function MetricCard({ label, value, valueClassName = "text-slate-800" }: Props) {
  return (
    <View className="flex-1 bg-[#F5EEFF] p-6 rounded-[32px] border border-slate-100">
      <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{label}</Text>
      <Text className={`text-3xl font-bold mt-2 ${valueClassName}`}>{value}</Text>
    </View>
  );
}