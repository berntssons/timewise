import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";

import globalStyles, { colors } from '@/utils/globalStyles';

export default function Button ({children, ...rest}: PropsWithChildren & PressableProps) {
 return (
    <Pressable style={{
        padding: 12,
        borderWidth: 1,
        borderColor: colors.accent,
    }} {...rest}>
        <Text style={globalStyles.button}>{children}</Text>
    </Pressable>
 )
}