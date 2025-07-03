import * as Notifications from 'expo-notifications';

export interface NotificationData {
  birth?: number;
  death?: number;
}

// First, set the handler that will cause the notification
// to show the alert
const init = () =>
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const { content, identifier: id, trigger } = notification.request;
      const data: NotificationData = content?.data;

      if (data.death && data.death < Date.now()) {
        cancel(id);
      }

      return {
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });

interface CreateOptions {
  content: Notifications.NotificationContentInput;
  seconds?: number;
  repeats?: boolean;
  onCreated?: (id: string, title: string) => void;
}

const create = async ({
  content,
  seconds = 0,
  repeats = false,
  onCreated,
}: CreateOptions) => {
  const id = await Notifications.scheduleNotificationAsync({
    content,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats,
    },
  });
  onCreated?.(id, content.title ?? id);
  return id;
};

const cancel = async (id: string, onCancelled?: () => void) => {
  await Notifications.cancelScheduledNotificationAsync(id);
  onCancelled?.();
};
const cancelAll = async (onCancelled?: () => void) => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  onCancelled?.();
};

const getActive = async () => {
  const active = await Notifications.getAllScheduledNotificationsAsync();
  const activeIds = active.map((notification) => notification.identifier);
  return activeIds;
};

const isActive = async (id: string) => {
  const active = await getActive();
  const isActive = active.includes(id);
  return isActive;
};

export default {
  init,
  create,
  cancel,
  cancelAll,
  getActive,
  isActive,
};
