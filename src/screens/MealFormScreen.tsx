import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Input, Header, SelectButton } from '../components';
import { theme } from '../constants/theme';
import { addMeal, updateMeal } from '../storage/mealStorage';
import { generateId } from '../utils/helpers';
import { RootStackParamList } from '../../App';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MealForm'>;
type RouteT = RouteProp<RootStackParamList, 'MealForm'>;

export function MealFormScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteT>();
  const editing = route.params?.meal;

  const [name, setName] = useState(editing?.name ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [date, setDate] = useState(editing?.date ?? '');
  const [time, setTime] = useState(editing?.time ?? '');
  const [isOnDiet, setIsOnDiet] = useState<boolean | null>(
    editing ? editing.isOnDiet : null
  );
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    date: '',
    time: '',
    isOnDiet: '',
  });

  function validate() {
    const newErrors = { name: '', date: '', time: '', isOnDiet: '' };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }

    if (!date.trim()) {
      newErrors.date = 'Data é obrigatória';
      valid = false;
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      newErrors.date = 'Use o formato DD/MM/AAAA';
      valid = false;
    }

    if (!time.trim()) {
      newErrors.time = 'Horário é obrigatório';
      valid = false;
    } else if (!/^\d{2}:\d{2}$/.test(time)) {
      newErrors.time = 'Use o formato HH:MM';
      valid = false;
    }

    if (isOnDiet === null) {
      newErrors.isOnDiet = 'Selecione se está dentro da dieta';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSave() {
    if (!validate()) return;
    setLoading(true);

    const [day, month, year] = date.split('/');
    const isoDate = `${year}-${month}-${day}`;

    try {
      if (editing) {
        await updateMeal({
          ...editing,
          name: name.trim(),
          description: description.trim(),
          date: isoDate,
          time,
          isOnDiet: isOnDiet!,
        });
        navigation.goBack();
      } else {
        const meal = {
          id: generateId(),
          name: name.trim(),
          description: description.trim(),
          date: isoDate,
          time,
          isOnDiet: isOnDiet!,
          createdAt: new Date().toISOString(),
        };
        await addMeal(meal);
        navigation.navigate('MealFeedback', { isOnDiet: isOnDiet! });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header title={editing ? 'Editar refeição' : 'Nova refeição'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Input
            label="Nome"
            value={name}
            onChangeText={setName}
            placeholder="Ex: Salada Caesar"
            error={errors.name}
          />

          <Input
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva sua refeição..."
            multiline
            error=""
          />

          <View style={styles.row}>
            <Input
              label="Data"
              value={date}
              onChangeText={setDate}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              containerStyle={styles.flex1}
              error={errors.date}
            />
            <Input
              label="Hora"
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
              keyboardType="numeric"
              containerStyle={styles.flex1}
              error={errors.time}
            />
          </View>

          <View style={styles.selectWrapper}>
            <Text style={styles.selectLabel}>Está dentro da dieta?</Text>
            <SelectButton value={isOnDiet} onChange={setIsOnDiet} />
            {errors.isOnDiet ? (
              <Text style={styles.errorText}>{errors.isOnDiet}</Text>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={editing ? 'Salvar alterações' : 'Cadastrar refeição'}
            onPress={handleSave}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: { flex: 1 },
  selectWrapper: {
    gap: 8,
  },
  selectLabel: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray2,
  },
  errorText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.xs,
    color: theme.colors.redDark,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray5,
    backgroundColor: theme.colors.gray7,
  },
});