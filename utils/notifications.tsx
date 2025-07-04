import * as Notifications from 'expo-notifications';

import { IReminderType } from '@/features/reminders';
import { formatActiveReminder, ScheduledNotification } from '@/utils/helpers';

export interface NotificationData {
  type: IReminderType;
  birth: number;
  death?: number;
}

export interface NotificationRequest extends Notifications.NotificationRequest {
  content: Notifications.NotificationContent & {
    title: string;
    data: NotificationData;
  };
}

const init = () =>
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const { content, identifier: id, trigger } = notification.request;
      const death = content?.data?.death;

      if (typeof death === 'number' && death < Date.now()) {
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
  title: string;
  type: IReminderType;
  interval: number;
  duration?: number;
  onCreated?: (id: string, data: NotificationData) => void;
}

const create = async ({
  title,
  type,
  interval,
  duration,
  onCreated,
}: CreateOptions) => {
  const data = {
    type,
    birth: Date.now(),
    ...(duration && {
      death: Date.now() + duration * 1000,
    }),
  };

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      data,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: interval ?? duration,
      repeats: !!interval,
    },
  });
  onCreated?.(id, data);

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
  return active.map((notification) =>
    formatActiveReminder(notification as ScheduledNotification)
  );
};

const isActive = async (id: string, isSavedId: boolean) => {
  const active = await getActive();
  return active.some((reminder) =>
    isSavedId ? reminder.savedId === id : reminder.id === id
  );
};

export default {
  init,
  create,
  cancel,
  cancelAll,
  getActive,
  isActive,
};
