import Card from "@/components/ui/basic-general/Card";
import Button from "@/components/ui/Button";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
type StatusVariant = "success" | "warning" | "pending";

interface ActiveRequest {
  id: string;
  category: string;
  title: string;
  statusLabel: string;
  statusVariant: StatusVariant;
  image: string;
}

interface AvailableService {
  id: string;
  tag?: string;
  title: string;
  price: string;
  priceUnit?: string;
  location: string;
  icon: keyof typeof Ionicons.glyphMap;
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------
const ACTIVE_REQUESTS: ActiveRequest[] = [
  {
    id: "1",
    category: "LIMPEZA",
    title: "Limpeza Residencial",
    statusLabel: "3 propostas recebidas",
    statusVariant: "success",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    category: "REPAROS",
    title: "Instalação Elétrica",
    statusLabel: "Aguardando prestador",
    statusVariant: "warning",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const AVAILABLE_SERVICES: AvailableService[] = [
  {
    id: "1",
    tag: "URGENTE",
    title: "Conserto de Ar Condicionado",
    price: "R$ 250,00",
    location: "Pinheiros, SP",
    icon: "snow",
    featured: true,
  },
  {
    id: "2",
    title: "Passeio com Cães",
    price: "R$ 45,00",
    priceUnit: "/h",
    location: "Vila Mariana, SP",
    icon: "paw",
  },
  {
    id: "3",
    title: "Jardinagem",
    price: "R$ 180,00",
    location: "Morumbi, SP",
    icon: "leaf",
  },
  {
    id: "4",
    title: "Pintura de Apartamento",
    price: "R$ 800,00",
    location: "Vila Madalena, SP",
    icon: "color-palette",
  },
  {
    id: "5",
    title: "Reforma de Banheiro",
    price: "R$ 1.200,00",
    location: "Moema, SP",
    icon: "construct",
  },
  {
    id: "6",
    title: "Instalação de Câmeras",
    price: "R$ 350,00",
    location: "Tatuapé, SP",
    icon: "camera",
  },
];

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

function StatusPill({ label, variant }: { label: string; variant: StatusVariant }) {
  const dotColors: Record<StatusVariant, string> = {
    success: "bg-indigo-500",
    warning: "bg-amber-400",
    pending: "bg-slate-400",
  };
  const textColors: Record<StatusVariant, string> = {
    success: "text-indigo-600",
    warning: "text-amber-500",
    pending: "text-slate-500",
  };
  return (
    <View className="flex-row items-center gap-1 mt-1">
      <View className={`w-2 h-2 rounded-full ${dotColors[variant]}`} />
      <Text className={`text-xs font-medium ${textColors[variant]}`}>{label}</Text>
    </View>
  );
}

function UrgencyTag({ label }: { label: string }) {
  return (
    <View className="bg-red-100 self-start px-2 py-0.5 rounded-md mb-2">
      <Text className="text-[10px] font-bold text-red-600 tracking-wider uppercase">
        {label}
      </Text>
    </View>
  );
}

function ActiveRequestCard({ item }: { item: ActiveRequest }) {
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <Card className="flex-row items-center mb-3">
        <Image source={{ uri: item.image }} className="w-12 h-12 rounded-xl mr-3" />
        <View className="flex-1">
          <Text className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">
            {item.category}
          </Text>
          <Text className="text-sm font-semibold text-slate-800 mt-0.5">
            {item.title}
          </Text>
          <StatusPill label={item.statusLabel} variant={item.statusVariant} />
        </View>
        <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
      </Card>
    </TouchableOpacity>
  );
}

/** Card largo com ícone decorativo gigante ao fundo */
function FeaturedServiceCard({ item }: { item: AvailableService }) {
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <Card className="mb-3 overflow-hidden">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-4">
            {item.tag && <UrgencyTag label={item.tag} />}
            <Text className="text-base font-bold text-slate-800 leading-snug">
              {item.title}
            </Text>
            <View className="flex-row items-baseline gap-0.5 mt-2">
              <Text className="text-lg font-bold text-indigo-600">{item.price}</Text>
              {item.priceUnit && (
                <Text className="text-xs text-slate-400">{item.priceUnit}</Text>
              )}
            </View>
            <View className="flex-row items-center mt-1 gap-1">
              <Ionicons name="location-outline" size={12} color="#94a3b8" />
              <Text className="text-xs text-slate-400">{item.location}</Text>
            </View>
          </View>
          {/* Ícone decorativo fantasma */}
          <View style={{ opacity: 0.08, position: "absolute", right: -8, bottom: -16 }}>
            <Ionicons name={item.icon} size={96} color="#6366f1" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

/** Card menor para grid 2 colunas */
function SmallServiceCard({ item }: { item: AvailableService }) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="flex-1">
      <Card className="mb-3">
        <View className="bg-indigo-50 self-start p-2 rounded-xl mb-3">
          <Ionicons name={item.icon} size={20} color="#6366f1" />
        </View>
        <Text className="text-sm font-bold text-slate-800 leading-snug" numberOfLines={2}>
          {item.title}
        </Text>
        <View className="flex-row items-center mt-1 gap-1">
          <Ionicons name="location-outline" size={10} color="#94a3b8" />
          <Text className="text-[11px] text-slate-400" numberOfLines={1}>
            {item.location}
          </Text>
        </View>
        <View className="flex-row items-baseline gap-0.5 mt-2">
          <Text className="text-sm font-bold text-indigo-600">{item.price}</Text>
          {item.priceUnit && (
            <Text className="text-[10px] text-slate-400">{item.priceUnit}</Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

/** Bottom Tab Bar */
function BottomTabBar() {
  const tabs = [
    { icon: "grid" as const, label: "Dashboard", active: true },
    { icon: "briefcase" as const, label: "Services", active: false },
    { icon: "user" as const, label: "Profile", active: false },
  ];
  return (
    <View
      className="bg-white flex-row justify-around items-center px-4 pt-3 border-t border-slate-100"
      style={{ paddingBottom: 24 }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.label} className="items-center gap-1" activeOpacity={0.7}>
          <Feather
            name={tab.icon}
            size={22}
            color={tab.active ? "#6366f1" : "#94a3b8"}
          />
          <Text
            className={`text-[10px] font-semibold tracking-wider uppercase ${
              tab.active ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Tela principal
// ---------------------------------------------------------------------------
export default function HomeScreen() {
  const router = useRouter();

  const featuredServices = AVAILABLE_SERVICES.filter((s) => s.featured);
  const gridServices = AVAILABLE_SERVICES.filter((s) => !s.featured);

  // Pares para o grid 2 colunas
  const gridRows: AvailableService[][] = [];
  for (let i = 0; i < gridServices.length; i += 2) {
    gridRows.push(gridServices.slice(i, i + 2));
  }

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
      >
        {/* ── Header ── */}
        <View className="bg-white px-5 pt-14 pb-5 flex-row items-center justify-between">
          <Text className="text-indigo-600 font-bold text-xl tracking-tight">
            AvaliaJá
          </Text>
          <TouchableOpacity>
            <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center">
              <Ionicons name="person" size={20} color="#6366f1" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-5 pt-5">
          {/* ── Saudação ── */}
          <Text className="text-slate-400 text-sm">Olá, João!</Text>
          <Text className="text-slate-800 text-lg font-semibold mb-5">
            Escolha sua próxima ação.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
          onPress={() => router.push({ pathname: "/(tabs)/criar-servico" } as any)}
            className="bg-indigo-600 rounded-2xl p-5 mb-6"
            style={{
              shadowColor: "#6366f1",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View className="bg-white/20 self-start p-2 rounded-xl mb-3">
              <Ionicons name="add" size={22} color="white" />
            </View>
            <Text className="text-white text-lg font-bold">Criar novo serviço</Text>
            <Text className="text-white/70 text-sm mt-1 mb-4">
              Publique sua necessidade para centenas de profissionais.
            </Text>
            <View className="bg-white self-start px-5 py-2 rounded-xl">
              <Text className="text-indigo-600 font-semibold text-sm">Começar agora</Text>
            </View>
          </TouchableOpacity>

          {/* ── Solicitações Ativas ── */}
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-slate-800 font-bold text-base">Solicitações Ativas</Text>
            <TouchableOpacity>
              <Text className="text-indigo-500 text-xs font-semibold uppercase tracking-wider">
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>

          {ACTIVE_REQUESTS.map((item) => (
            <ActiveRequestCard key={item.id} item={item} />
          ))}

          {/* ── Serviços Disponíveis ── */}
          <View className="flex-row justify-between items-center mt-4 mb-3">
            <Text className="text-slate-800 font-bold text-base">Serviços Disponíveis</Text>
            <TouchableOpacity>
              <Feather name="sliders" size={18} color="#6366f1" />
            </TouchableOpacity>
          </View>

          {/* Card destaque — largura total */}
          {featuredServices.map((item) => (
            <FeaturedServiceCard key={item.id} item={item} />
          ))}

          {/* Grid 2 colunas */}
          {gridRows.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row gap-3">
              {row.map((item) => (
                <SmallServiceCard key={item.id} item={item} />
              ))}
              {row.length === 1 && <View className="flex-1" />}
            </View>
          ))}

          <Button title="Ver mais serviços" />
        </View>
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <BottomTabBar />
    </View>
  );
}