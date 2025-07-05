import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/app/store';
import useNotificationListeners from '@/hooks/useNotificationListeners';
import notifications from '@/utils/notifications';

notifications.init();

export default function RootLayout() {
  useNotificationListeners();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
