import * as Notifications from 'expo-notifications';

import { NOTIFICATION_CHANNEL } from '@/utils/constants';

import { getActive, isActive } from './active';
import { cancel, cancelAll } from './cancel';
import { create } from './create';

const init = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const { content, identifier: id, trigger } = notification.request;
      const { data } = content;

      if (typeof data.death === 'number' && data.death < Date.now()) {
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
