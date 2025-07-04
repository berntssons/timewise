import { StyleSheet } from 'react-native';

import { DARK_GRAY, DARKER_GRAY, ORANGE, RED, WHITE } from '@/utils/constants';

export const colors = {
    text: WHITE,
    bg: DARK_GRAY,
    bgSecondary: DARKER_GRAY,
    accent: ORANGE,
    critical: RED,
}

export const typography = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontFamily: 'monospace',
        color: colors.text,
    },
    h2: {
        fontSize: 24,
        fontFamily: 'monospace',
        color: colors.text,
    },
    h3: {
        fontSize: 20,
        fontFamily: 'monospace',
        color: colors.text,
    },
    p: {
        fontSize: 16,
        fontFamily: 'monospace',
        color: colors.text,
    },
    label: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: colors.text,
    },
    button: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: colors.text,
    }
});