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
  active: {  
    [id: string]: IReminder
  },
}

const initialState = { saved: {}, active: {} } satisfies ReminderState as ReminderState;

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
    addActiveReminder: (state, action: PayloadAction<IReminder>) => {
      state.active[action.payload.id] = action.payload;
    },
    removeActiveReminder: (state, action: PayloadAction<{ id: string }>) => {
      delete state.active[action.payload.id];
    }
  },
});

export const { saveReminder, deleteReminder } = remindersSlice.actions;

export default remindersSlice.reducer;
