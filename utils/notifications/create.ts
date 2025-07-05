import * as Notifications from 'expo-notifications';

import { IReminderType } from '@/features/reminders';
import { NOTIFICATION_CHANNEL } from '@/utils/constants';
import { getAccumulatedTimeText } from '../helpers';

export interface NotificationData {
  type: IReminderType;
  createdAt: number;
  interval?: number;
  duration?: number;
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
  presetId,
  savedId,
  onCreated,
}: CreateOptions) => {
  const data = {
    type,
    createdAt: Date.now(),
    duration,
    savedId,
  };

  const id = await Notifications.scheduleNotificationAsync({
    ...(presetId && { identifier: presetId }),
    content: {
      title,
      body: getAccumulatedTimeText(interval, 'second', duration),
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

export const replace = async (
  request: Notifications.NotificationRequest,
  onReplaced?: (id: string) => void
) => {
  const id = await Notifications.scheduleNotificationAsync(
    request as Notifications.NotificationRequestInput
  );
  onReplaced?.(id);
  return id;
};
