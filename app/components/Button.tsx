import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";

import globalStyles from '@/app/globalStyles';

export default function Button ({children, ...rest}: PropsWithChildren & PressableProps) {
 return (
    <Pressable style={{
        padding: 12,
        backgroundColor: 'orange',
        borderRadius: 3,
    }} {...rest}>
        <Text style={globalStyles.button}>{children}</Text>
    </Pressable>
 )
}