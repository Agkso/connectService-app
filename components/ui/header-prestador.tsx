import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { Colors } from '@/constants/theme';

export function HeaderPrestador() {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <IconSymbol name="line.horizontal.3" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>
          Ola, <Text style={styles.highlightText}>Prestador!</Text>
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <View style={styles.bellContainer}>
            <IconSymbol name="bell.fill" size={22} color={Colors.light.text} />
            <View style={styles.notificationDot} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: Colors.light.background,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  highlightText: {
    color: Colors.light.tint,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.secondary, 
  },
  avatarButton: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
