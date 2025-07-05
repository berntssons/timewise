export const durationStringToSeconds = (durationString: string) => {
  const [hourString, minuteString, secondString] = durationString.split(':');
  const hoursInSeconds = parseInt(hourString, 10) * 3600;
  const minutesInSeconds = parseInt(minuteString, 10) * 60;
  const seconds = parseInt(secondString, 10);
  return hoursInSeconds + minutesInSeconds + seconds;
};
