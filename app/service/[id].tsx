import Card from "@/components/ui/basic-general/Card";
import MetricCard from "@/components/ui/basic-general/MetricCard";
import StatusBanner from "@/components/ui/basic-general/StatusBanner";
import { serviceMock } from "@/constants/mock";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceDetails() {
  const service = serviceMock;
  const location = serviceMock.location;

  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <StatusBanner message="✔ Serviço aceito com sucesso!" variant="success" />
      <Card title="Localização" className="mt-6">
        <Text className="text-gray-700">{location.address}</Text>
        <Text className="text-gray-400 text-sm">{location.distance}</Text>
      </Card>
      <View className="flex-row gap-4 mt-8">
        <MetricCard label="RECOMPENSA" value={`R$ ${service.price}`} valueClassName="text-indigo-600" />
        <MetricCard label="TEMPO EST." value={service.time} />
      </View>
    </SafeAreaView>
  );
}