import * as Notifications from 'expo-notifications';

import { IActiveReminder } from '@/features/reminders';
import { NotificationRequest } from './create';

const formatActiveReminder = ({
  identifier,
  content: { title, data },
  trigger,
}: NotificationRequest): IActiveReminder => {
  return {
    id: identifier,
    type: data.type,
    title: title,
    interval: (trigger as Notifications.TimeIntervalNotificationTrigger)
      .seconds,
    createdAt: data.createdAt,
    duration: data.duration,
    savedId: data.savedId,
  };
};

export const getActive = async () => {
  const active = await Notifications.getAllScheduledNotificationsAsync();
  return active.map((notification) =>
    formatActiveReminder(notification as NotificationRequest)
  );
};

export const isActive = async (id: string, isSavedId: boolean) => {
  const active = await getActive();
  return active.some((reminder) =>
    isSavedId ? reminder.savedId === id : reminder.id === id
  );
};
