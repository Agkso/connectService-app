import Button from "@/components/ui/Button";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CriarServico() {
    const [selectedCat, setSelectedCat] = useState("Limpeza");
    const categories = ["Limpeza", "Manutenção", "Educação", "Tecnologia", "Outros"];

    return (
        <ScrollView className="flex-1 bg-[#F9F9FF] px-6 pt-12">
            {/* Header Profile Area (AvaliaJá + UserAvatar) */}
            <View className="flex-row items-center justify-between mb-8">
                <View className="flex-row items-center gap-2">
                    <View className="w-6 h-0.5 bg-black" />
                    <View className="w-6 h-0.5 bg-black absolute top-1.5" />
                    <View className="w-6 h-0.5 bg-black absolute top-3" />
                    <Text className="text-xl font-bold ml-8">AvaliaJá</Text>
                </View>
                <View className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center overflow-hidden">
                    <Image source={{ uri: "https://i.pravatar.cc/150?img=68" }} className="w-full h-full" />
                </View>
            </View>

            {/* Title */}
            <Text className="text-indigo-600 font-semibold uppercase tracking-wider mb-2">Novo Projeto</Text>
            <Text className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2">
                O que você precisa hoje?
            </Text>
            <Text className="text-gray-500 text-base mb-8">
                Descreva seu serviço e conecte-se com os melhores profissionais da região.
            </Text>

            {/* Category Selection */}
            <Text className="font-bold text-slate-800 text-base mb-3">Selecione a Categoria</Text>
            <View className="flex-row flex-wrap gap-3 mb-8">
                {categories.map((cat) => {
                    const isActive = selectedCat === cat;
                    return (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setSelectedCat(cat)}
                            className={`px-5 py-2.5 rounded-full ${isActive ? 'bg-[#4338CA]' : 'bg-[#E0E7FF]'}`}
                        >
                            <Text className={`font-semibold ${isActive ? 'text-white' : 'text-slate-700'}`}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Description input */}
            <Text className="font-bold text-slate-800 text-base mb-3">Descrição do Serviço</Text>
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 mb-8 border border-slate-100">
                <TextInput
                    className="text-base text-slate-700 h-32"
                    placeholder="Detalhe o que você precisa: data, local, especificações técnicas..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    textAlignVertical="top"
                />
                <Text className="text-right text-gray-400 text-xs mt-2">0 / 500</Text>
            </View>

            {/* Photos */}
            <Text className="font-bold text-slate-800 text-base mb-3">Anexar Fotos (Opcional)</Text>
            <View className="flex-row gap-4 mb-4">
                <TouchableOpacity className="w-24 h-24 border-2 border-dashed border-[#A5B4FC] rounded-2xl items-center justify-center bg-[#EEF2FF]">
                    {/* Simple custom plus icon */}
                    <View className="w-8 h-8 rounded border-2 border-[#A5B4FC] items-center justify-center p-1">
                        <Text className="text-[#A5B4FC] font-bold text-xl leading-none">+</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80" }}
                    className="w-24 h-24 rounded-2xl bg-gray-200"
                />
            </View>

            <Button title="Publicar serviço" />

            <Text className="text-center text-sm text-[#A5B4FC] mb-20 -mt-2">
                Ao publicar, você concorda com nossos Termos de Uso.
            </Text>
        </ScrollView>
    );
}
