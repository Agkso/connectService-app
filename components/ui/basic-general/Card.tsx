import { Text, View } from "react-native";

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function Card({ children, title, className = "" }: Props) {
  return (
    <View className={`bg-white rounded-xl border border-slate-100 p-4 ${className}`}>
      {title && (
        <>
          <Text className="text-sm font-semibold text-slate-800 mb-2">{title}</Text>
          <View className="border-t border-slate-100 mb-3" />
        </>
      )}
      {children}
    </View>
  );
}