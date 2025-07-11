import { PropsWithChildren } from 'react';
import { Pressable, PressableProps, Text, ViewStyle } from 'react-native';

import { colors, typography } from '@/utils/globalStyles';

export default function Button({
  children,
  style,
  ...rest
}: PropsWithChildren & PressableProps) {
  return (
    <Pressable
      style={{
        padding: 12,
        borderWidth: 1,
        borderColor: colors.accent,
        ...(style as ViewStyle),
      }}
      {...rest}
    >
      <Text style={typography.button}>{children}</Text>
    </Pressable>
  );
}
