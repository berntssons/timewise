import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import useNotifications from '@/hooks/useNotifications';
import { colors, typography } from '@/utils/globalStyles';

import Button from '@/components/Button';

export default function Saved() {
  const { unsave, unsaveAll, cancel, start } = useNotifications();

  const savedReminders = useSelector(
    (state: RootState) => state.reminders.saved
  );
  const activeReminders = useSelector(
    (state: RootState) => state.reminders.active
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        gap: 20,
        padding: 20,
      }}
    >
      <Text style={{ ...typography.h3, color: colors.accent, width: '100%' }}>
        Saved reminders
      </Text>
      {Object.entries(savedReminders).map(([savedId, reminder]) => {
        const activeId = Object.keys(activeReminders).find(
          (id) => activeReminders[id].savedId === savedId
        );
        return (
          <View
            key={savedId}
            style={{
              width: '100%',
              gap: 12,
              borderWidth: 1,
              borderColor: colors.text,
              padding: 12,
            }}
          >
            <Text style={typography.h3}>{reminder.title}</Text>
            <Text style={typography.p}>
              {reminder.type}
              {reminder.duration && ` - ${reminder.duration} seconds`}
            </Text>
            {reminder.interval && (
              <Text style={typography.p}>
                {`Reminder every ${reminder.interval} seconds`}
              </Text>
            )}
            {activeId ? (
              <Button onPress={() => cancel(activeId)}>Cancel</Button>
            ) : (
              <Button onPress={() => start(reminder)}>Start</Button>
            )}
            <Button onPress={() => unsave(reminder.savedId)}>Delete</Button>
          </View>
        );
      })}
      {/* <Button onPress={unsaveAll}>Delete all</Button> */}
    </ScrollView>
  );
}
