import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Header } from '../components';
import { theme } from '../constants/theme';
import { deleteMeal } from '../storage/mealStorage';
import { formatDate } from '../utils/helpers';
import { RootStackParamList } from '../../App';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MealDetail'>;
type RouteT = RouteProp<RootStackParamList, 'MealDetail'>;

export function MealDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteT>();
  const { meal } = route.params;
  const [loading, setLoading] = useState(false);

  const isOnDiet = meal.isOnDiet;
  const headerColor = isOnDiet ? theme.colors.greenLight : theme.colors.redLight;

  function handleDelete() {
    Alert.alert(
      'Excluir refeição',
      'Deseja realmente excluir essa refeição? A ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim, excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            await deleteMeal(meal.id);
            navigation.navigate('Home');
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Refeição" color={headerColor} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Nome */}
        <Text style={styles.name}>{meal.name}</Text>

        {/* Descrição */}
        {meal.description ? (
          <Text style={styles.description}>{meal.description}</Text>
        ) : null}

        {/* Data e hora */}
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>Data e hora</Text>
            <Text style={styles.infoValue}>
              {formatDate(meal.date)} às {meal.time}
            </Text>
          </View>
        </View>

        {/* Status */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: isOnDiet ? theme.colors.greenLight : theme.colors.redLight },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnDiet ? theme.colors.greenDark : theme.colors.redDark },
            ]}
          />
          <Text style={styles.statusText}>
            {isOnDiet ? 'dentro da dieta' : 'fora da dieta'}
          </Text>
        </View>
      </ScrollView>

      {/* Ações */}
      <View style={styles.footer}>
        <Button
          label="Editar refeição"
          onPress={() => navigation.navigate('MealForm', { meal })}
          icon="✎"
        />
        <Button
          label="Excluir refeição"
          onPress={handleDelete}
          variant="secondary"
          loading={loading}
          icon="🗑"
        />
      </View>
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
    gap: 16,
    paddingBottom: 32,
  },
  name: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.gray1,
  },
  description: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.md,
    color: theme.colors.gray2,
    lineHeight: 24,
  },
  infoRow: {
    gap: 8,
  },
  infoLabel: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray1,
  },
  infoValue: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray1,
  },
  footer: {
    padding: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray5,
    backgroundColor: theme.colors.gray7,
  },
});