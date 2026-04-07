import Button from "@/components/ui/Button";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    return (
        <SafeAreaView className="flex-1 bg-[#F0EEFA]">
            <ScrollView className="px-4 pb-8">
                <Text className="text-2xl font-extrabold text-center mt-6 text-slate-800">Avalia Já</Text>

                <View className="items-center mt-10 mb-6">
                    <Image source={require("../assets/images/login-img.jpeg")} className="w-16 h-16 rounded-2xl" resizeMode="cover" />
                </View>

                <Text className="text-3xl font-extrabold text-center text-slate-800">
                    Bem-vindo
                </Text>
                <Text className="text-base text-center text-slate-500 mt-2">
                    Conecte-se para gerenciar seus serviços.
                </Text>

                <Text className="text-xs font-bold text-slate-500 tracking-widest mt-6 mb-1">
                    EMAIL
                </Text>
                <View className="bg-white rounded-xl flex-row items-center px-4 border border-slate-100">
                    <Text className="text-slate-400 text-base mr-2">✉</Text>
                    <TextInput placeholder="seu@email.com" placeholderTextColor="#94a3b8" keyboardType="email-address" autoCapitalize="none" className="flex-1 py-4 text-slate-700" />
                </View>

                <Text className="text-xs font-bold text-slate-500 tracking-widest mt-4 mb-1">
                    SENHA
                </Text>
                <View className="bg-white rounded-xl flex-row items-center px-4 border border-slate-100">
                    <Text className="text-slate-400 text-base mr-2">🔒</Text>
                    <TextInput placeholder="••••••••" placeholderTextColor="#94a3b8" className="flex-1 py-4 text-slate-700" />
                    <TouchableOpacity>
                        <Text className="text-slate-400 text-base">👁</Text>
                    </TouchableOpacity>       
                </View>

                <TouchableOpacity className="mt-3 self-end">
                    <Text className="text-indigo-600 font-semibold text-sm">
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>

                <View className="mt-6">
                    <Button title="Entrar" />
                </View>

                <View className="flex-row items-center mt-4 gap-3">
                    <View className="flex-1 h-px bg-slate-200" />
                    <Text className="text-xs text-slate-400 tracking-widest font-semibold">
                        OU ACESSE COM
                    </Text>
                    <View className="flex-1 h-px bg-slate-200" />
                </View>

                <View className="flex-row gap-3 mt-4">
                    <TouchableOpacity className="flex-1 bg-white border border-slate-100 rounded-xl py-3 flex-row items-center justify-center gap-2">
                        <Text className="text-base">G</Text>
                        <Text className="font-semibold text-slate-700">Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 bg-white border border-slate-100 rounded-xl py-3 flex-row items-center justify-center gap-2">
                        <Text className="text-base font-light text-slate-400 text-xs">iOS</Text>
                        <Text className="font-semibold text-slate-700">Apple</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-sm text-slate-500 mt-8">
                    Não possui uma conta?
                    <TouchableOpacity>
                        <Text className="text-indigo-600 font-semibold">
                            Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}