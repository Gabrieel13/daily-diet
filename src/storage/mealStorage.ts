import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types';

const STORAGE_KEY = '@daily_diet:meals';

export async function getMeals(): Promise<Meal[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveMeals(meals: Meal[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  } catch (error) {
    console.error('Erro ao salvar refeições:', error);
  }
}

export async function addMeal(meal: Meal): Promise<void> {
  const meals = await getMeals();
  await saveMeals([...meals, meal]);
}

export async function updateMeal(updated: Meal): Promise<void> {
  const meals = await getMeals();
  await saveMeals(meals.map((m) => (m.id === updated.id ? updated : m)));
}

export async function deleteMeal(id: string): Promise<void> {
  const meals = await getMeals();
  await saveMeals(meals.filter((m) => m.id !== id));
}