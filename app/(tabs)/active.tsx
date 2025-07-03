import { useFocusEffect } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import useNotifications from '@/hooks/useNotifications';
import globalStyles, { colors } from '@/utils/globalStyles';

import Button from '@/components/Button';
import ConfirmButton from '@/components/ConfirmButton';

export default function Saved() {
  const { cancel, cancelAll, updateActive } = useNotifications();

  const activeReminders = useSelector(
    (state: RootState) => state.reminders.active
  );

  useFocusEffect(() => {
    updateActive();
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        gap: 20,
        padding: 20,
      }}
    >
      <Text style={{ ...globalStyles.h3, color: colors.accent, width: '100%' }}>
        Active reminders
      </Text>
      {Object.entries(activeReminders)?.map(([id, reminder]) =>
        reminder ? (
          <View
            key={id}
            style={{
              width: '100%',
              gap: 12,
              borderWidth: 1,
              borderColor: colors.text,
              padding: 12,
            }}
          >
            <Text style={globalStyles.h3}>{reminder.title}</Text>
            <Text style={globalStyles.p}>{reminder.type}</Text>
            <Button onPress={() => cancel(id)}>Cancel</Button>
          </View>
        ) : null
      )}
      {Object.keys(activeReminders).length > 0 && (
        <ConfirmButton onPress={cancelAll}>Cancel all</ConfirmButton>
      )}
    </ScrollView>
  );
}
