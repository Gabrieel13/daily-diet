export const theme = {
  colors: {
    // Produto
    redDark: '#BF3B44',
    redMid: '#F3BABD',
    redLight: '#F4E6E7',

    // Produto
    greenDark: '#639339',
    greenMid: '#CBE4B4',
    greenLight: '#E5F0DB',

    // Base
    gray1: '#1B1D1E',
    gray2: '#333638',
    gray3: '#5C6265',
    gray4: '#B9BBBC',
    gray5: '#DDDEDF',
    gray6: '#EFF0F0',
    gray7: '#FAFAFA',
    white: '#FFFFFF',
  },
  fontFamily: {
    regular: 'NunitoSans_400Regular',
    bold: 'NunitoSans_700Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
} as const;

export type Theme = typeof theme;