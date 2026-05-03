import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '../components';
import { theme } from '../constants/theme';
import { getMeals } from '../storage/mealStorage';
import { calculateStats } from '../utils/helpers';

export function StatsScreen() {
  const [stats, setStats] = useState({
    total: 0,
    onDiet: 0,
    offDiet: 0,
    percentage: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  useFocusEffect(
    useCallback(() => {
      getMeals().then((meals) => setStats(calculateStats(meals)));
    }, [])
  );

  const isGood = stats.percentage >= 50;
  const headerColor = isGood ? theme.colors.greenLight : theme.colors.redLight;

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Estatísticas" color={headerColor} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Percentual principal */}
        <View style={[styles.mainCard, { backgroundColor: headerColor }]}>
          <Text
            style={[
              styles.mainPercent,
              { color: isGood ? theme.colors.greenDark : theme.colors.redDark },
            ]}
          >
            {stats.percentage.toFixed(2).replace('.', ',')}%
          </Text>
          <Text style={styles.mainLabel}>das refeições dentro da dieta</Text>
        </View>

        <Text style={styles.sectionTitle}>Estatísticas gerais</Text>

        {/* Sequências */}
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{stats.bestStreak}</Text>
          <Text style={styles.cardLabel}>melhor sequência de refeições dentro da dieta</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>{stats.currentStreak}</Text>
          <Text style={styles.cardLabel}>sequência atual de refeições dentro da dieta</Text>
        </View>

        {/* Total */}
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{stats.total}</Text>
          <Text style={styles.cardLabel}>refeições registradas</Text>
        </View>

        {/* Dentro e fora */}
        <View style={styles.row}>
          <View style={[styles.cardHalf, { backgroundColor: theme.colors.greenLight }]}>
            <Text style={styles.cardNumber}>{stats.onDiet}</Text>
            <Text style={styles.cardLabel}>refeições dentro da dieta</Text>
          </View>
          <View style={[styles.cardHalf, { backgroundColor: theme.colors.redLight }]}>
            <Text style={styles.cardNumber}>{stats.offDiet}</Text>
            <Text style={styles.cardLabel}>refeições fora da dieta</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.gray7,
  },
  content: {
    padding: 24,
    gap: 12,
    paddingBottom: 32,
  },
  mainCard: {
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  mainPercent: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xxl,
  },
  mainLabel: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray2,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  card: {
    backgroundColor: theme.colors.gray6,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  cardNumber: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.gray1,
  },
  cardLabel: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  cardHalf: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
});