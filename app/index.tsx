import { ScrollView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor, RootState } from '@/app/store';
import { colors } from '@/utils/globalStyles';
import notifications from '@/utils/notifications';

import Button from '@/components/Button';
import CreateNotification from '@/components/CreateNotification';

notifications.init();

export default function Index() {
  const savedReminders = useSelector(
    (state: RootState) => state.reminders.saved
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              gap: 20,
              padding: 20,
              backgroundColor: colors.bg,
            }}
          >
            <CreateNotification />
            <Button onPress={() => notifications.cancelAll()}>
              Cancel all
            </Button>
            <Text>Saved reminders</Text>
            {savedReminders.map((reminder) => (
              <Text key={reminder.id}>
                {reminder.title} - {reminder.type}
              </Text>
            ))}
          </ScrollView>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
