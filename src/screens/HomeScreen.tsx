import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Meal } from '../types';
import { MealCard, Button } from '../components';
import { theme } from '../constants/theme';
import { getMeals } from '../storage/mealStorage';
import { groupMealsByDate, calculateStats, formatDate } from '../utils/helpers';
import { RootStackParamList } from '../../App';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const [meals, setMeals] = useState<Meal[]>([]);

  useFocusEffect(
    useCallback(() => {
      getMeals().then(setMeals);
    }, [])
  );

  const stats = calculateStats(meals);
  const sections = groupMealsByDate(meals);
  const isGood = stats.percentage >= 50;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.gray7} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            {/* Logo */}
            <View style={styles.logoRow}>
              <Text style={styles.logoText}>
                <Text style={styles.logoGreen}>Daily</Text>
                <Text style={styles.logoDark}>Diet</Text>
              </Text>
            </View>

            {/* Stats Card */}
            <TouchableOpacity
              style={[
                styles.statsCard,
                { backgroundColor: isGood ? theme.colors.greenLight : theme.colors.redLight },
              ]}
              onPress={() => navigation.navigate('Stats')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.statsPercent,
                  { color: isGood ? theme.colors.greenDark : theme.colors.redDark },
                ]}
              >
                {stats.percentage.toFixed(2).replace('.', ',')}%
              </Text>
              <Text style={styles.statsLabel}>das refeições dentro da dieta</Text>
              <Text
                style={[
                  styles.statsArrow,
                  { color: isGood ? theme.colors.greenDark : theme.colors.redDark },
                ]}
              >
                ↗
              </Text>
            </TouchableOpacity>

            {/* New Meal Button */}
            <View style={styles.newMealSection}>
              <Text style={styles.sectionTitle}>Refeições</Text>
              <Button
                label="Nova refeição"
                onPress={() => navigation.navigate('MealForm', { meal: undefined })}
                icon="+"
              />
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.dateHeader}>{formatDate(section.date)}</Text>
        )}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetail', { meal: item })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>
              Nenhuma refeição cadastrada ainda.{'\n'}Adicione sua primeira refeição!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.gray7,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  logoRow: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoText: {
    fontSize: theme.fontSize.xl,
  },
  logoGreen: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.greenDark,
  },
  logoDark: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray1,
  },
  statsCard: {
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  statsPercent: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xxl,
  },
  statsLabel: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
    marginTop: 4,
  },
  statsArrow: {
    position: 'absolute',
    top: 12,
    right: 16,
    fontSize: 20,
  },
  newMealSection: {
    gap: 8,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.gray1,
  },
  dateHeader: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.gray1,
    marginBottom: 8,
    marginTop: 8,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyIcon: { fontSize: 48 },
  emptyText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray3,
    textAlign: 'center',
    lineHeight: 22,
  },
});