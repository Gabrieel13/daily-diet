export interface Meal {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  isOnDiet: boolean;
  createdAt: string;
}

export interface MealFormData {
  name: string;
  description: string;
  date: string;
  time: string;
  isOnDiet: boolean;
}

export interface DietStats {
  total: number;
  onDiet: number;
  offDiet: number;
  percentage: number;
  currentStreak: number;
  bestStreak: number;
}