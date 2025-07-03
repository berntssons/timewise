import { IAlarmType } from '@/components/AlarmType'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IReminder {
  title: string
  type: IAlarmType,
  interval: number,
  duration?: number,
  savedId?: string,
};

export interface ISavedReminder extends IReminder {
  savedId: string,
};

export interface IActiveReminder {
  id: string,
  title: string,
  interval: number,
  type: IAlarmType,
  birth: number,
  death?: number,
  savedId?: string,
}

interface ReminderState {
  saved: {
    [savedId: string]: ISavedReminder
  },
  active: {  
    [id: string]: IActiveReminder
  },
}

const initialState = { saved: {}, active: {} } satisfies ReminderState as ReminderState;

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    saveReminder: (state, action: PayloadAction<ISavedReminder>) => {
      state.saved[action.payload.savedId] = action.payload;
    },
    deleteReminder: (state, action: PayloadAction<{ savedId: string }>) => {
      delete state.saved[action.payload.savedId];
    },
    deleteAllReminders: (state) => {
      state.saved = {};
    },
    activateReminder: (state, action: PayloadAction<IActiveReminder>) => {
      state.active[action.payload.id] = action.payload;
    },
    cancelReminder: (state, action: PayloadAction<{ id: string }>) => {
      delete state.active[action.payload.id];
    },
    updateActiveReminders: (state, action: PayloadAction<IActiveReminder[]>) => {
      state.active = {};
      for (const reminder of action.payload) {
        state.active[reminder.id] = reminder;
      }
    }
  },
});

export const { saveReminder, deleteReminder, deleteAllReminders, activateReminder, cancelReminder, updateActiveReminders } = remindersSlice.actions;

export default remindersSlice.reducer;
