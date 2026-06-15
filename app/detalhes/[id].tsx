import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { HeaderPrestador } from '@/components/ui/header-prestador';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { formatServiceDate } from '@/components/ui/card-oferta';

interface ServiceDetailProps {
  id: number;
  tipoServico: string;
  categoria: string;
  valor: number;
  dataServico: string;
  horarioInicio: string;
  horarioFim: string;
  bairro: string;
  cidade: string;
  estado: string;
  endereco: string;
  requisitos: string[];
  contratante: string;
  avaliacao: number;
  status: string;
}

export default function DetalhesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [servico, setServico] = useState<ServiceDetailProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);


  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://connectservice-api-production.up.railway.app/api/servicos/${id}`
      );
      if (!response.ok) {
        throw new Error('Serviço não encontrado');
      }
      const data = await response.json();
      setServico(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar detalhes do serviço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id, fetchDetail]);

  const handleOpenMap = () => {
    if (!servico) return;
    const fullAddress = `${servico.endereco}, ${servico.bairro}, ${servico.cidade} - ${servico.estado}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    
    
    const url = Platform.select({
      ios: `maps://0,0?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    });

    Linking.openURL(url).catch((err) => {
      console.error('Error opening maps:', err);
      Alert.alert('Erro', 'Não foi possível abrir o aplicativo de mapas.');
    });
  };

  const handleAcceptService = () => {
    if (!servico) return;
    const netValue = servico.valor * 0.8;
    const formattedValue = netValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    Alert.alert(
      'Aceitar Serviço',
      `Confirmar o aceite de "${servico.tipoServico}" por ${formattedValue} líquidos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setAccepted(true);
            Alert.alert(
              'Sucesso',
              'Serviço aceito com sucesso! O contratante será notificado.',
              [{ text: 'Ok', onPress: () => router.back() }]
            );
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <HeaderPrestador />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.loadingText}>Carregando detalhes do serviço...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !servico) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <HeaderPrestador />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Serviço não encontrado'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchDetail}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const netValue = servico.valor * 0.8;
  const formattedValue = Math.floor(netValue); 
  

  const initials = servico.contratante
    .split(' ')
    .map((name) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>

      <HeaderPrestador />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{servico.categoria.toUpperCase()}</Text>
        </View>


        <Text style={styles.title}>{servico.tipoServico}</Text>


        <View style={styles.valueRow}>
          <View>
            <Text style={styles.valueLabel}>Lucro Estimado</Text>
            <Text style={styles.valueText}>R$ {formattedValue}</Text>
          </View>
          

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <IconSymbol name="calendar" size={16} color={Colors.light.secondary} />
              <Text style={styles.dateTimeText}>
                {formatServiceDate(servico.dataServico)}
              </Text>
            </View>
            <View style={styles.dateTimeItem}>
              <IconSymbol name="clock.fill" size={16} color={Colors.light.secondary} />
              <Text style={styles.dateTimeText}>
                {servico.horarioInicio} - {servico.horarioFim || 'Fim indefinido'}
              </Text>
            </View>
          </View>
        </View>


        <TouchableOpacity style={styles.mapCard} activeOpacity={0.9} onPress={handleOpenMap}>

          <View style={styles.mapGridLineH1} />
          <View style={styles.mapGridLineH2} />
          <View style={styles.mapGridLineV1} />
          <View style={styles.mapGridLineV2} />


          <View style={styles.pinContainer}>
            <View style={styles.pinIconBox}>
              <IconSymbol name="mappin.and.ellipse" size={20} color={Colors.light.tint} />
            </View>
            <View>
              <Text style={styles.pinBairro}>{servico.bairro}</Text>
              <Text style={styles.pinCidade}>
                {servico.cidade} - {servico.estado}
              </Text>
            </View>
          </View>


          <TouchableOpacity style={styles.mapExternalButton} activeOpacity={0.7} onPress={handleOpenMap}>
            <IconSymbol name="square.and.arrow.up" size={18} color={Colors.light.text} />
          </TouchableOpacity>
        </TouchableOpacity>


        <View style={styles.requirementsCard}>
          <View style={styles.cardHeader}>
            <IconSymbol name="checkmark.circle.fill" size={20} color={Colors.light.tint} />
            <Text style={styles.cardHeaderTitle}>Requisitos do Serviço</Text>
          </View>
          
          {servico.requisitos && servico.requisitos.length > 0 ? (
            servico.requisitos.map((req, index) => (
              <View key={index} style={styles.requirementItem}>
                <View style={styles.cyanBullet} />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReqsText}>Nenhum requisito especial informado.</Text>
          )}
        </View>


        <View style={styles.contractorCard}>
          <Text style={styles.contractorLabel}>Contratante</Text>
          <View style={styles.contractorBody}>
            <View style={styles.contractorAvatar}>
              <Text style={styles.contractorAvatarText}>{initials}</Text>
            </View>
            <View>
              <Text style={styles.contractorName}>{servico.contratante}</Text>
              <View style={styles.ratingRow}>
                <IconSymbol name="star.fill" size={14} color={Colors.light.tint} />
                <Text style={styles.ratingText}>{servico.avaliacao?.toFixed(1) || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>


      <View style={styles.bottomFooter}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.7} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.acceptButton, accepted ? styles.disabledAcceptButton : null]} 
          activeOpacity={0.8}
          onPress={handleAcceptService}
          disabled={accepted}
        >
          <Text style={styles.acceptButtonText}>
            {accepted ? 'Serviço Aceito' : 'Aceitar Serviço'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    color: Colors.light.textSecondary,
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 8,
  },
  categoryText: {
    color: Colors.light.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  valueLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueText: {
    fontSize: 44,
    fontWeight: '900',
    color: Colors.light.tint,
    marginTop: 2,
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '500',
  },
  mapCard: {
    height: 150,
    backgroundColor: '#181818',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGridLineH1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    height: 1,
    backgroundColor: '#262626',
  },
  mapGridLineH2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    height: 1,
    backgroundColor: '#262626',
  },
  mapGridLineV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '33%',
    width: 1,
    backgroundColor: '#262626',
  },
  mapGridLineV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '66%',
    width: 1,
    backgroundColor: '#262626',
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pinIconBox: {
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinBairro: {
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  pinCidade: {
    color: Colors.light.textSecondary,
    fontSize: 11,
  },
  mapExternalButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#222',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  requirementsCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#262626',
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginVertical: 6,
  },
  cyanBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.secondary, 
    marginTop: 8,
  },
  requirementText: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  noReqsText: {
    color: Colors.light.textSecondary,
    fontSize: 13,
  },
  contractorCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#262626',
    padding: 16,
    marginBottom: 10,
  },
  contractorLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  contractorBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contractorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.light.secondary, 
  },
  contractorAvatarText: {
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contractorName: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    fontSize: 13,
  },
  bottomFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
    backgroundColor: Colors.light.background,
    gap: 12,
  },
  backButton: {
    flex: 2,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
  },
  backButtonText: {
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  acceptButton: {
    flex: 3,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
  },
  disabledAcceptButton: {
    backgroundColor: '#333',
  },
  acceptButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
