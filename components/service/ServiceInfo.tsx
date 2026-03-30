import { Service } from "@/types/service";
import { Text, View } from "react-native";

type Props = {
  service: Service;
};

export default function ServiceInfo({ service }: Props) {
  return (
    <View className="mt-6">
      <View className="flex-row">
        <Text className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
          Limpeza Residencial
        </Text>
        <Text className="ml-auto text-pink-600 font-bold">★ 4.9</Text>
      </View>

      <View className="mt-4">
        <Text className="text-3xl font-extrabold text-slate-800 leading-tight">
          {service.title}
        </Text>

        <Text className="text-slate-500 text-base mt-2">
           👤 Solicitado por {service.client}
        </Text>
      </View>

      <View className="flex-row gap-4 mt-8">
        <View className="flex-1 bg-[#F5EEFF] p-6 rounded-[32px] border border-slate-100">
           <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">RECOMPENSA</Text>
           <Text className="text-indigo-600 text-3xl font-bold mt-2">R$ {service.price}</Text>
        </View>
        <View className="flex-1 bg-[#F5EEFF] p-6 rounded-[40px] border border-slate-100">
           <Text className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">TEMPO EST.</Text>
           <Text className="text-slate-800 text-3xl font-bold mt-2">{service.time}</Text>
        </View>
      </View>
    </View>
  );
}