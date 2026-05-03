import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { theme } from '../constants/theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({ label, error, containerStyle, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error ? styles.inputError : {},
          rest.multiline ? styles.multiline : {},
        ]}
        placeholderTextColor={theme.colors.gray4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  label: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray5,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray1,
    backgroundColor: theme.colors.white,
  },
  inputFocused: {
    borderColor: theme.colors.gray3,
  },
  inputError: {
    borderColor: theme.colors.redDark,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.redDark,
  },
});