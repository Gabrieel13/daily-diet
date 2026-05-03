import { Meal, DietStats } from '../types';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function groupMealsByDate(meals: Meal[]): { date: string; data: Meal[] }[] {
  const groups: { [key: string]: Meal[] } = {};

  meals.forEach((meal) => {
    if (!groups[meal.date]) {
      groups[meal.date] = [];
    }
    groups[meal.date].push(meal);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, data]) => ({
      date,
      data: data.sort((a, b) => b.time.localeCompare(a.time)),
    }));
}

export function calculateStats(meals: Meal[]): DietStats {
  const total = meals.length;
  const onDiet = meals.filter((m) => m.isOnDiet).length;
  const offDiet = total - onDiet;
  const percentage = total > 0 ? (onDiet / total) * 100 : 0;

  // Calcula sequência atual e melhor sequência
  const sorted = [...meals].sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.time.localeCompare(a.time);
  });

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  for (const meal of sorted) {
    if (meal.isOnDiet) {
      tempStreak++;
      if (tempStreak > bestStreak) bestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Sequência atual (do início)
  for (const meal of sorted) {
    if (meal.isOnDiet) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { total, onDiet, offDiet, percentage, currentStreak, bestStreak };
}