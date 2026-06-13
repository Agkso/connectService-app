import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { HeaderPrestador } from "@/components/ui/header-prestador";
import { CardOferta, ServiceProps } from "@/components/ui/card-oferta";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [servicos, setServicos] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchServicos = async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(
        "https://connectservice-api-production.up.railway.app/api/servicos"
      );
      if (!response.ok) {
        throw new Error("Erro de resposta do servidor");
      }
      const data = await response.json();
      setServicos(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as ofertas. Verifique sua conexão.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const handleRefresh = () => {
    fetchServicos(true);
  };


  const availableServices = servicos.filter(
    (item) => item.status === "AGUARDANDO_ACEITE"
  );

  const filteredServices = selectedCategory
    ? availableServices.filter(
        (item) => item.categoria.toLowerCase() === selectedCategory.toLowerCase()
      )
    : availableServices;

  const toggleCategory = (category: string) => {
    if (selectedCategory?.toLowerCase() === category.toLowerCase()) {
      setSelectedCategory(null); 
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <HeaderPrestador />


        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Ofertas de hoje</Text>
          <Text style={styles.heroSubtitle}>
            Encontre as melhores oportunidades perto de você.
          </Text>
        </View>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.chip,
              selectedCategory === null
                ? styles.chipActive
                : styles.chipInactive,
            ]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === null
                  ? styles.chipTextActive
                  : styles.chipTextInactive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.chip,
              selectedCategory?.toLowerCase() === "limpeza residencial"
                ? styles.chipActive
                : styles.chipInactive,
            ]}
            onPress={() => toggleCategory("Limpeza Residencial")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory?.toLowerCase() === "limpeza residencial"
                  ? styles.chipTextActive
                  : styles.chipTextInactive,
              ]}
            >
              Limpeza Residencial
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.chip,
              selectedCategory?.toLowerCase() === "elétrica"
                ? styles.chipActive
                : styles.chipInactive,
            ]}
            onPress={() => toggleCategory("Elétrica")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory?.toLowerCase() === "elétrica"
                  ? styles.chipTextActive
                  : styles.chipTextInactive,
              ]}
            >
              Elétrica
            </Text>
          </TouchableOpacity>
        </ScrollView>


        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
            <Text style={styles.loadingText}>Buscando ofertas de serviço...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => fetchServicos()}>
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredServices}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.light.tint}
                colors={[Colors.light.tint]}
              />
            }
            renderItem={({ item }) => (
              <CardOferta
                item={item}
                onPressDetails={() => router.push({ pathname: '/detalhes/[id]', params: { id: item.id.toString() } })}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {selectedCategory
                    ? `Nenhuma oferta na categoria "${selectedCategory}".`
                    : "Não há ofertas de serviço pendentes no momento."}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  filterScroll: {
    maxHeight: 48,
    marginBottom: 20,
  },
  filterScrollContent: {
    gap: 8,
    alignItems: "center",
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "transparent",
    borderColor: Colors.light.tint,
  },
  chipInactive: {
    backgroundColor: "#1D1D1D",
    borderColor: "#2D2D2D",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextActive: {
    color: Colors.light.tint,
  },
  chipTextInactive: {
    color: Colors.light.textSecondary,
  },
  listContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    color: Colors.light.textSecondary,
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: "center",
  },
});
