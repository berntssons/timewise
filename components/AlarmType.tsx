import { ComponentType } from 'react';
import { Image, Text, View } from 'react-native';

import { IReminderType, REMINDER_TYPES } from '@/features/reminders';
import { colors, typography } from '@/utils/globalStyles';

import alarm from '@/assets/icons/alarm.png';
import timer from '@/assets/icons/hourglass.png';
import stopwatch from '@/assets/icons/timer.png';

const icons = {
  [REMINDER_TYPES.ALARM]: alarm,
  [REMINDER_TYPES.TIMER]: timer,
  [REMINDER_TYPES.STOPWATCH]: stopwatch,
};

const AlarmType: ComponentType<{ selected?: boolean; type: IReminderType }> = ({
  selected,
  type = REMINDER_TYPES.TIMER,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 12,
        backgroundColor: selected ? colors.text : 'transparent',
        borderWidth: 1,
        borderColor: colors.text,
      }}
    >
      <Image
        source={icons[type]}
        width={50}
        style={{ tintColor: selected ? colors.bgSecondary : colors.text }}
      />
      <Text
        style={{
          ...typography.label,
          color: selected ? colors.bgSecondary : colors.text,
        }}
      >
        {type}
      </Text>
    </View>
  );
};

export default AlarmType;
