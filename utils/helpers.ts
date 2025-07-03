import { IActiveReminder } from "@/features/reminders/remindersSlice";
import { NotificationRequest } from "./notifications";

export type ScheduledNotification = NotificationRequest & {
    trigger: {
        seconds: number;
    }
}
export const formatActiveReminder = (notification: ScheduledNotification): IActiveReminder => {
  return {
    id: notification.identifier,
    type: notification.content.data.type,
    title: notification.content.title,
    interval: notification.trigger?.seconds ?? 0,
    birth: notification.content.data.birth,
    death: notification.content.data.death,
  };
};