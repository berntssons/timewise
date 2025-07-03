import { IAlarmType } from '@/components/AlarmType'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IReminder {
  id: string
  title: string
  type: IAlarmType,
}

interface ReminderState {
  saved: IReminder[]
}

const initialState = { saved: [] } satisfies ReminderState as ReminderState;

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    saveReminder: (state, action: PayloadAction<IReminder>) => {
      state.saved.push(action.payload);
    },
    deleteReminder: (state, action: PayloadAction<{ id: string }>) => {
      state.saved = state.saved.filter(reminder => reminder.id !== action.payload.id);
    }
  },
});

export const { saveReminder, deleteReminder } = remindersSlice.actions;

export default remindersSlice.reducer;
