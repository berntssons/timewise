import { useDispatch } from 'react-redux';

import { IReminder, ISavedReminder } from '@/features/reminders';
import {
  activateReminder,
  deleteAllReminders,
  deleteReminder,
  saveReminder,
  updateActiveReminders,
} from '@/features/reminders/remindersSlice';
import notifications from '@/utils/notifications';

const useNotifications = () => {
  const dispatch = useDispatch();

  const save = (reminder: IReminder) => {
    const savedId = Date.now().toString();
    dispatch(saveReminder({ ...reminder, savedId }));
    return savedId;
  };

  const unsave = (savedId: string) => {
    dispatch(deleteReminder({ savedId }));
  };

  const unsaveAll = () => {
    dispatch(deleteAllReminders());
  };

  const start = async ({
    title,
    duration,
    interval,
    type,
    savedId,
  }: IReminder) => {
    if (savedId && (await notifications.isActive(savedId, true))) {
      return;
    }

    notifications.create({
      type,
      title,
      interval,
      duration,
      onCreated: (id, data) => {
        dispatch(
          activateReminder({
            id,
            title,
            interval,
            savedId,
            ...data,
          })
        );
      },
    });
  };

  const saveAndStart = (reminder: IReminder | ISavedReminder) => {
    const savedId = save(reminder);
    start({ ...reminder, savedId });
  };

  const updateActive = async () => {
    const active = await notifications.getActive();
    dispatch(updateActiveReminders(active));
  };

  const cancel = (id: string) => {
    notifications.cancel(id, updateActive);
  };

  const cancelAll = () => {
    notifications.cancelAll();
    dispatch(updateActiveReminders([]));
  };

  return {
    save,
    unsave,
    unsaveAll,
    start,
    saveAndStart,
    cancel,
    cancelAll,
    updateActive,
  };
};

export default useNotifications;
