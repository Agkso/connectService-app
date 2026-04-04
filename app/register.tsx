import Card from "@/components/ui/basic-general/Card";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [type, setType] = useState<"cliente" | "prestador">("cliente");

  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <ScrollView className="px-4 pb-8">

    
        <Text className="text-2xl font-extrabold text-center mt-6 text-slate-800">
          AvaliaJá
        </Text>

        <Text className="text-lg text-center mt-2 font-semibold text-slate-700">
          Crie sua conta
        </Text>

        <Text className="text-center text-slate-500 mt-2">
          Junte-se à maior rede de prestação de serviços
        </Text>

        
        <Card className="mt-6">

          
          <Text className="text-xs font-bold text-slate-500 mb-2">
            EU SOU UM:
          </Text>

          <View className="flex-row gap-2 mb-4">
            <TouchableOpacity
              onPress={() => setType("cliente")}
              className={`flex-1 p-3 rounded-xl items-center ${
                type === "cliente" ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <Text className={`${type === "cliente" ? "text-white" : "text-gray-700"}`}>
                Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType("prestador")}
              className={`flex-1 p-3 rounded-xl items-center ${
                type === "prestador" ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <Text className={`${type === "prestador" ? "text-white" : "text-gray-700"}`}>
                Prestador
              </Text>
            </TouchableOpacity>
          </View>

         
          <Text className="text-sm text-slate-600 mb-1">Nome completo</Text>
          <TextInput
            placeholder="Ex: João Silva"
            className="bg-gray-100 p-3 rounded-xl mb-3"
          />

          <Text className="text-sm text-slate-600 mb-1">E-mail</Text>
          <TextInput
            placeholder="nome@exemplo.com"
            className="bg-gray-100 p-3 rounded-xl mb-3"
          />

          <Text className="text-sm text-slate-600 mb-1">Senha</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            className="bg-gray-100 p-3 rounded-xl mb-4"
          />

          
          <Button title="Cadastrar" />

          
          <Text className="text-center text-sm text-slate-500 mt-4">
            Já possui uma conta?{" "}
            <Text className="text-indigo-600 font-semibold">
              Entre aqui
            </Text>
          </Text>

        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}