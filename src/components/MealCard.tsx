import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Meal } from '../types';
import { theme } from '../constants/theme';

interface MealCardProps {
  meal: Meal;
  onPress: () => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.time}>{meal.time}</Text>
      <View style={styles.divider} />
      <Text style={styles.name} numberOfLines={1}>
        {meal.name}
      </Text>
      <View
        style={[
          styles.dot,
          { backgroundColor: meal.isOnDiet ? theme.colors.greenDark : theme.colors.redDark },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.gray5,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 12,
  },
  time: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray1,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: theme.colors.gray4,
  },
  name: {
    flex: 1,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});