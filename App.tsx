import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import { View, ActivityIndicator } from 'react-native';

import { Meal } from './src/types';
import {
  HomeScreen,
  StatsScreen,
  MealFormScreen,
  MealDetailScreen,
  MealFeedbackScreen,
} from './src/screens';

export type RootStackParamList = {
  Home: undefined;
  Stats: undefined;
  MealForm: { meal?: Meal };
  MealDetail: { meal: Meal };
  MealFeedback: { isOnDiet: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="MealForm" component={MealFormScreen} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        <Stack.Screen name="MealFeedback" component={MealFeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}