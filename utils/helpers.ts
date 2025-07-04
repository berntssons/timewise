import { IActiveReminder } from '@/features/reminders';
import { NotificationRequest } from '@/utils/notifications';

export type ScheduledNotification = NotificationRequest & {
  trigger: {
    seconds: number;
  };
};
export const formatActiveReminder = (
  notification: ScheduledNotification
): IActiveReminder => {
  return {
    id: notification.identifier,
    type: notification.content.data.type,
    title: notification.content.title,
    interval: notification.trigger?.seconds ?? 0,
    birth: notification.content.data.birth,
    death: notification.content.data.death,
  };
};

export const durationStringToSeconds = (durationString: string) => {
  const [hourString, minuteString, secondString] = durationString.split(':');
  const hoursInSeconds = parseInt(hourString, 10) * 3600;
  const minutesInSeconds = parseInt(minuteString, 10) * 60;
  const seconds = parseInt(secondString, 10);
  return hoursInSeconds + minutesInSeconds + seconds;
};
