import { ITimeUnit } from '@/features/reminders';

export const durationStringToSeconds = (durationString: string) => {
  const [hourString, minuteString, secondString] = durationString.split(':');
  const hoursInSeconds = parseInt(hourString, 10) * 3600;
  const minutesInSeconds = parseInt(minuteString, 10) * 60;
  const seconds = parseInt(secondString, 10);
  return hoursInSeconds + minutesInSeconds + seconds;
};

const adjustTimeForUnit = (timeInSeconds: number, unit: ITimeUnit) => {
  const time = {
    second: timeInSeconds,
    minute: timeInSeconds / 60,
    hour: timeInSeconds / 3600,
  };
  return time[unit];
};

export const getAccumulatedTimeText = (
  timePassed: number,
  unit: ITimeUnit = 'second',
  totalTime?: number
) => {
  if (totalTime) {
    const timeLeft = adjustTimeForUnit(totalTime - timePassed, unit);
    return `${timeLeft} ${unit}s remaining`;
  } else {
    return `${adjustTimeForUnit(timePassed, unit)} ${unit}s have passed`;
  }
};
