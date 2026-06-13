import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { IconSymbol } from './icon-symbol';

export interface ServiceProps {
  id: number;
  tipoServico: string;
  categoria: string;
  bairro: string;
  cidade: string;
  estado: string;
  valor: number;
  dataServico: string;
  horarioInicio: string;
  possuiAssinatura: boolean;
  status: string;
}

interface CardOfertaProps {
  item: ServiceProps;
  onPressDetails: () => void;
}

export function formatServiceDate(dateStr: string, timeStr?: string): string {
  try {
    const today = new Date('2026-06-13T00:00:00');
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const serviceDate = new Date(`${dateStr}T00:00:00`);
    
    const isToday = serviceDate.getTime() === today.getTime();
    const isTomorrow = serviceDate.getTime() === tomorrow.getTime();

    const timeSuffix = timeStr ? `, às ${timeStr}` : '';

    if (isToday) {
      return `Hoje${timeSuffix}`;
    }
    if (isTomorrow) {
      return `Amanhã${timeSuffix}`;
    }

    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    const dayName = days[serviceDate.getDay()];
    const dayNum = serviceDate.getDate();
    const monthName = months[serviceDate.getMonth()];
    
    return `${dayName}, ${dayNum} ${monthName}`;
  } catch {
    return dateStr + (timeStr ? `, às ${timeStr}` : '');
  }
}

export function CardOferta({ item, onPressDetails }: CardOfertaProps) {
  const netValue = item.valor * 0.8;

  
  const categoryIcon = item.categoria.toLowerCase().includes('limpeza') ? 'drop.fill' : 'wrench.fill';

  
  const formattedValue = netValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPressDetails}
      style={styles.card}
    >
      
      <View style={styles.body}>
        <View style={styles.leftContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item.tipoServico}
          </Text>
          <View style={styles.locationContainer}>
            <IconSymbol 
              name="mappin.and.ellipse" 
              size={14} 
              color={Colors.light.textSecondary} 
            />
            <Text style={styles.locationText}>
              {item.bairro}, {item.estado}
            </Text>
          </View>
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.liquidLabel}>VALOR</Text>
          <Text style={styles.valueText}>
            {formattedValue}
          </Text>
        </View>
      </View>

      
      <View style={styles.divider} />

      
      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <View style={styles.iconBox}>
            <IconSymbol name={categoryIcon} size={16} color={Colors.light.textSecondary} />
          </View>
          <View>
            <Text style={styles.dateLabel}>Data do serviço</Text>
            <Text style={styles.dateValue}>
              {formatServiceDate(item.dataServico, item.horarioInicio)}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.detailsButton} 
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation();
            onPressDetails();
          }}
        >
          <Text style={styles.detailsButtonText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#222',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  leftContent: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  liquidLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    letterSpacing: 1,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
    color: Colors.light.tint, 
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
    marginVertical: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: '#252525',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
  },
  acceptButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
