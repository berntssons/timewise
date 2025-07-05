import * as Notifications from 'expo-notifications';

import { IReminderType } from '@/features/reminders';
import { NOTIFICATION_CHANNEL } from '@/utils/constants';

export interface NotificationData {
  type: IReminderType;
  birth: number;
  death?: number;
  interval?: number;
  savedId?: string;
}

export interface NotificationRequest extends Notifications.NotificationRequest {
  content: Notifications.NotificationContent & {
    title: string;
    data: NotificationData;
  };
}

interface CreateOptions {
  title: string;
  type: IReminderType;
  interval: number;
  duration?: number;
  body?: string;
  presetId?: string;
  savedId?: string;
  onCreated?: (id: string, data: NotificationData) => void;
}

export const create = async ({
  title,
  type,
  interval,
  duration,
  body,
  presetId,
  savedId,
  onCreated,
}: CreateOptions) => {
  const data = {
    type,
    birth: Date.now(),
    ...(duration && {
      death: Date.now() + duration * 1000,
    }),
    savedId,
  };

  const id = await Notifications.scheduleNotificationAsync({
    ...(presetId && { identifier: presetId }),
    content: {
      title,
      body,
      data,
      priority: Notifications.AndroidNotificationPriority.HIGH, // Android without channels
      interruptionLevel: 'timeSensitive', // iOS
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      channelId: NOTIFICATION_CHANNEL.ID,
      seconds: interval ?? duration,
      repeats: !!interval,
    },
  });
  onCreated?.(id, data);

  return id;
};
