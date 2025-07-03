import { ScrollView } from 'react-native';

import { colors } from '@/utils/globalStyles';
import notifications from '@/utils/notifications';

import CreateNotification from '@/components/CreateNotification';

notifications.init();

export default function Create() {
  return (
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
    </ScrollView>
  );
}
