import { StyleSheet } from 'react-native';

const lightest = '#fff';
const dark = '#2A272C';
const darkest = '#1A171C';
const orange = '#FFB855';

export const colors = {
    text: lightest,
    bg: dark,
    bgSecondary: darkest,
    accent: orange,
}

const styles = StyleSheet.create({
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

export default styles;