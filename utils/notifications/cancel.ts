import * as Notifications from 'expo-notifications';

export const cancel = async (id: string, onCancelled?: () => void) => {
  await Notifications.cancelScheduledNotificationAsync(id);
  onCancelled?.();
};

export const cancelAll = async (onCancelled?: () => void) => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  onCancelled?.();
};
