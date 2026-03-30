import ServiceDescription from "@/components/service/ServiceDescription";
import ServiceHeader from "@/components/service/ServiceHeader";
import ServiceInfo from "@/components/service/ServiceInfo";
import ServiceLocation from "@/components/service/ServiceLocation";
import Button from "@/components/ui/Button";
import { serviceMock } from "@/constants/mock";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceDetails() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <ServiceHeader />

      <ScrollView className="px-4">
        <View className="mt-4">
          <Text className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg">
            ✔ Serviço aceito com sucesso!
          </Text>
        </View>

        <ServiceInfo service={serviceMock} />
        <ServiceLocation location={serviceMock.location} />
        <ServiceDescription description={serviceMock.description} />

        <Button title="Aceitar Serviço" />
      </ScrollView>
    </SafeAreaView>
  );
}