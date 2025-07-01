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
    },
    h2: {
        fontSize: 24,
        fontFamily: 'monospace',
    },
    h3: {
        fontSize: 20,
        fontFamily: 'monospace',
    },
    p: {
        fontSize: 16,
        fontFamily: 'monospace',
    },
    label: {
        fontSize: 12,
        fontFamily: 'monospace',
    },
    button: {
        fontSize: 12,
        fontFamily: 'monospace',
    }
});

export default styles;