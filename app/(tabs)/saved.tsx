import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import { deleteReminder } from '@/features/reminders/remindersSlice';
import globalStyles, { colors } from '@/utils/globalStyles';
import notifications from '@/utils/notifications';

import Button from '@/components/Button';

export default function Saved() {
  const savedReminders = useSelector(
    (state: RootState) => state.reminders.saved
  );
  const dispatch = useDispatch();

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
        Saved reminders
      </Text>
      {Object.entries(savedReminders).map(([id, reminder]) => (
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
          <Button onPress={() => notifications.cancel(id)}>Cancel</Button>
          <Button
            onPress={() => {
              dispatch(deleteReminder({ id }));
              notifications.cancel(id);
            }}
          >
            Delete
          </Button>
        </View>
      ))}
    </ScrollView>
  );
}
