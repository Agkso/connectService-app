import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList, Image,
    ListRenderItem,
    SafeAreaView, ScrollView, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';

const brandPurple = '#5D5FEF';

interface Service {
  id: string;
  title: string;
  grossValue: number;
  description: string;
  status: string;
  imageUrl?: string;
  provider?: string;
  dateTime?: string;
  rating?: number;
  finishedDate?: string;
}

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Limpeza Residencial Premium',
    grossValue: 225, 
    description: 'Limpeza detalhada de 3 quartos, incluindo janelas e varanda gourmet.',
    status: 'ACEITO',
    provider: 'Marcos Silva',
    dateTime: 'Amanhã, 09:00',
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800', 
  },
  {
    id: '2',
    title: 'Reparo de Ar Condicionado',
    grossValue: 312.5,
    description: 'Higienização e carga de gás em unidade Split na Zona 07, Maringá.',
    status: 'CRIADO',
    imageUrl: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Montagem de Guarda-Roupa',
    grossValue: 187.5,
    description: 'Montagem de móvel planejado de 6 portas na Av. Guedner, Zona 08.',
    status: 'CONCLUÍDO',
    rating: 5.0,
    finishedDate: '12 Out',
    imageUrl: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const FILTERS = ['Todos', 'Criado', 'Aceito', 'Concluído'];

export default function ListServices() {
  const [activeTab, setActiveTab] = useState('Meus Serviços');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredServices = MOCK_SERVICES.filter(service => {
    if (activeFilter === 'Todos') return true;
    const statusMap: Record<string, string> = {
      'Criado': 'CRIADO',
      'Aceito': 'ACEITO',
      'Concluído': 'CONCLUÍDO'
    };
    return service.status === statusMap[activeFilter];
  });

  const renderServiceCard: ListRenderItem<Service> = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.badge, item.status === 'ACEITO' ? styles.badgeAceito : styles.badgeCriado]}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
          <Text style={styles.priceValue}>R$ {(item.grossValue * 0.8).toLocaleString('pt-BR')}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
           <Text style={styles.footerText}>
             {item.status === 'CONCLUÍDO' ? `⭐ ${item.rating} • ${item.finishedDate}` : (item.dateTime || 'Aguardando...')}
           </Text>
           <TouchableOpacity>
             <Text style={styles.detailsLink}>Ver Detalhes &rarr;</Text>
           </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="menu" size={24} color={brandPurple} />
        <Text style={[styles.logo, { color: brandPurple }]}>AvaliaJá</Text>
        <View style={styles.avatar} />
      </View>

      <View style={styles.tabs}>
        {['Meus Serviços', 'Serviços Disponíveis'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)} 
            style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 60 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
          {FILTERS.map(f => (
            <TouchableOpacity 
              key={f} 
              onPress={() => setActiveFilter(f)} 
              style={[styles.chip, activeFilter === f && styles.chipActive]}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFCFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  logo: { fontSize: 20, fontWeight: '800' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2D3748' },
  tabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15 },
  tabItem: { paddingBottom: 10, marginRight: 25 },
  tabItemActive: { borderBottomWidth: 3, borderBottomColor: brandPurple },
  tabText: { color: '#A0AEC0', fontWeight: '700' },
  tabTextActive: { color: brandPurple },
  filterList: { paddingHorizontal: 20, alignItems: 'center' },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 15, backgroundColor: '#F0F2F8', marginRight: 10 },
  chipActive: { backgroundColor: brandPurple },
  chipText: { fontSize: 13, color: '#718096', fontWeight: '600' },
  chipTextActive: { color: '#FFF' },
  list: { paddingHorizontal: 20 },
  cardContainer: { backgroundColor: '#FFF', borderRadius: 24, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  cardImage: { width: '100%', height: 160 },
  cardContent: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '800', marginTop: 10 },
  cardDescription: { color: '#718096', marginVertical: 10, lineHeight: 20 },
  priceValue: { fontSize: 22, fontWeight: '900', color: brandPurple },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F0F2F8', paddingTop: 15 },
  footerText: { color: '#718096', fontSize: 13 },
  detailsLink: { color: brandPurple, fontWeight: 'bold' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeAceito: { backgroundColor: '#E0E7FF' },
  badgeCriado: { backgroundColor: '#FAF5FF' },
  badgeText: { fontSize: 10, fontWeight: '800', color: brandPurple }
});