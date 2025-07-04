import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import { typography } from '@/utils/globalStyles';

interface Props {
  label: string;
  layout?: 'row' | 'column';
}

export default function InputWrapper({
  label,
  layout = 'column',
  children,
}: Props & PropsWithChildren) {
  return (
    <View
      style={{
        flexDirection: layout,
        alignItems: layout === 'row' ? 'center' : 'flex-start',
      }}
    >
      <Text style={{ ...typography.p, marginBottom: 12 }}>{label}</Text>
      {children}
    </View>
  );
}
