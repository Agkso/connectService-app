import Card from "@/components/ui/basic-general/Card";
import MetricCard from "@/components/ui/basic-general/MetricCard";
import StatusBanner from "@/components/ui/basic-general/StatusBanner";
import Button from "@/components/ui/Button";
import { serviceMock } from "@/constants/mock";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceDetails() {
  const service = serviceMock;
  const location = serviceMock.location;

  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <ScrollView className="px-4 pb-8">


        <StatusBanner message="✔ Serviço aceito com sucesso!" variant="success" />
        <View className="mt-4 rounded-2xl overflow-hidden">
          <Image
            source={service.image2}
            className="w-full h-48"
            resizeMode="cover"
          />
        </View>

        <View className="flex-row items-center mt-6">
          <Text className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            {service.category}
          </Text>
          <Text className="ml-auto text-pink-600 font-bold">★ {service.rating}</Text>
        </View>

        <Text className="text-3xl font-extrabold text-slate-800 leading-tight mt-4">
          {service.title}
        </Text>
        <Text className="text-slate-500 text-base mt-2">
          👤 Solicitado por {service.client}
        </Text>

        <View className="flex-row gap-4 mt-8">
          <MetricCard
            label="RECOMPENSA"
            value={`R$ ${service.price}`}
            valueClassName="text-indigo-600"
          />
          <MetricCard label="TEMPO EST." value={service.time} />
        </View>

        <Card title="Localização" className="mt-6">
          <Text className="text-gray-700">{location.address}</Text>
          <Text className="text-gray-400 text-sm mt-1">{location.distance}</Text>
        </Card>

        <Card title="Descrição Completa" className="mt-6">
          <Text className="text-gray-700 leading-relaxed">{service.description}</Text>
        </Card>

        <View className="mt-8 mb-4">
          <Button title="Aceitar Serviço" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}