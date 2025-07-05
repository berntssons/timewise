export enum REMINDER_TYPES {
  TIMER = 'Timer',
  STOPWATCH = 'Stopwatch',
  ALARM = 'Alarm',
}

export type IReminderType =
  | REMINDER_TYPES.ALARM
  | REMINDER_TYPES.TIMER
  | REMINDER_TYPES.STOPWATCH;

export type ITimeUnit = 'second' | 'minute' | 'hour';

export interface IReminder {
  title: string;
  type: IReminderType;
  interval: number;
  intervalUnit?: ITimeUnit;
  duration?: number;
  savedId?: string;
}

export interface ISavedReminder extends IReminder {
  savedId: string;
}

export interface IActiveReminder {
  id: string;
  title: string;
  interval: number;
  type: IReminderType;
  createdAt: number;
  duration?: number;
  savedId?: string;
}

export interface ReminderState {
  saved: {
    [savedId: string]: ISavedReminder;
  };
  active: {
    [id: string]: IActiveReminder;
  };
}
