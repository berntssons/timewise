import { IAlarmType } from '@/components/AlarmType'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IReminder {
  id: string
  title: string
  type: IAlarmType,
}

interface ReminderState {
  saved: {
    [id: string]: IReminder
  },
  active: [id: string][] 
}

const initialState = { saved: {}, active: [] } satisfies ReminderState as ReminderState;

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    saveReminder: (state, action: PayloadAction<IReminder>) => {
      state.saved[action.payload.id] = action.payload;
    },
    deleteReminder: (state, action: PayloadAction<{ id: string }>) => {
      delete state.saved[action.payload.id];
    },
    addActiveReminder: (state, action: PayloadAction<{id: string}>) => {
      const reminderId = action.payload.id;
      if (!state.active.some(([id]) => id === reminderId)) {
        state.active.push([reminderId]);
      }
    },
    removeActiveReminder: (state, action: PayloadAction<{id: string}>) => {
      const reminderId = action.payload.id;
      state.active = state.active.filter(([id]) => id !== reminderId);
    }
  },
});

export const { saveReminder, deleteReminder } = remindersSlice.actions;

export default remindersSlice.reducer;
