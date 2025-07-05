import * as Notifications from 'expo-notifications';

import { NOTIFICATION_CHANNEL } from '@/utils/constants';

import { getAccumulatedTimeText } from '../helpers';
import { getActive, isActive } from './active';
import { cancel, cancelAll } from './cancel';
import { create, replace } from './create';

const init = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const { content, identifier, trigger } = notification.request;
      const { data } = content;
      const createdAt = typeof data.createdAt === 'number' && data.createdAt;
      const duration =
        typeof data.duration === 'number' ? data.duration : undefined;

      if (createdAt && duration) {
        const expiresAt = createdAt + duration * 1000;
        if (Date.now() > expiresAt) cancel(identifier);
      }

      if (createdAt) {
        const secondsElapsed = Math.round((Date.now() - createdAt) / 1000);
        const interval = (trigger as Notifications.TimeIntervalTriggerInput)
          .seconds;
        const duration =
          typeof data.duration === 'number' ? data.duration : undefined;

        replace({
          identifier,
          content: {
            ...content,
            body: getAccumulatedTimeText(
              secondsElapsed + interval,
              'second',
              duration
            ),
          },
          trigger,
        });
      }

      return {
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });

  // Delete any default Android channels
  const channels = await Notifications.getNotificationChannelsAsync();
  channels.forEach(async ({ id, name }) => {
    if (id !== NOTIFICATION_CHANNEL.ID) {
      await Notifications.deleteNotificationChannelAsync(id);
    }
  });

  // Create Android channel
  Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL.ID, {
    name: NOTIFICATION_CHANNEL.NAME,
    importance: Notifications.AndroidImportance.HIGH,
  });
};

export default {
  init,
  create,
  cancel,
  cancelAll,
  getActive,
  isActive,
};
