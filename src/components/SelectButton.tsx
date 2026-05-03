import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../constants/theme';

interface SelectButtonProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export function SelectButton({ value, onChange }: SelectButtonProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.btn,
          value === true && styles.btnSelectedGreen,
        ]}
        onPress={() => onChange(true)}
        activeOpacity={0.8}
      >
        <View style={[styles.dot, { backgroundColor: theme.colors.greenDark }]} />
        <Text style={[styles.label, value === true && styles.labelSelected]}>
          Sim
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.btn,
          value === false && styles.btnSelectedRed,
        ]}
        onPress={() => onChange(false)}
        activeOpacity={0.8}
      >
        <View style={[styles.dot, { backgroundColor: theme.colors.redDark }]} />
        <Text style={[styles.label, value === false && styles.labelSelected]}>
          Não
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.colors.gray6,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  btnSelectedGreen: {
    backgroundColor: theme.colors.greenLight,
    borderColor: theme.colors.greenDark,
  },
  btnSelectedRed: {
    backgroundColor: theme.colors.redLight,
    borderColor: theme.colors.redDark,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
  },
  labelSelected: {
    color: theme.colors.gray1,
  },
});