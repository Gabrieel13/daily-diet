import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '../components';
import { theme } from '../constants/theme';
import { RootStackParamList } from '../../App';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MealFeedback'>;
type RouteT = RouteProp<RootStackParamList, 'MealFeedback'>;

export function MealFeedbackScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteT>();
  const { isOnDiet } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {isOnDiet ? (
          <>
            <Text style={[styles.title, { color: theme.colors.greenDark }]}>
              Continue assim!
            </Text>
            <Text style={styles.subtitle}>
              Você continua{' '}
              <Text style={styles.bold}>dentro da dieta</Text>
              {'. '}
              Muito bem!
            </Text>
            <Text style={styles.illustration}>🥗</Text>
          </>
        ) : (
          <>
            <Text style={[styles.title, { color: theme.colors.redDark }]}>
              Que pena!
            </Text>
            <Text style={styles.subtitle}>
              Você saiu{' '}
              <Text style={styles.bold}>fora da dieta</Text>
              {' dessa vez, mas continue se esforçando e não desista!'}
            </Text>
            <Text style={styles.illustration}>😔</Text>
          </>
        )}

        <Button
          label="Ir para a página inicial"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.xxl,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.md,
    color: theme.colors.gray2,
    textAlign: 'center',
    lineHeight: 24,
  },
  bold: {
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray1,
  },
  illustration: {
    fontSize: 80,
    marginVertical: 16,
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
});