import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { IReminderType, REMINDER_TYPES } from '@/features/reminders';
import useNotifications from '@/hooks/useNotifications';
import useSelect from '@/hooks/useSelect';
import { colors, typography } from '@/utils/globalStyles';
import notifications from '@/utils/notifications';

import AlarmType from '@/components/AlarmType';
import Button from '@/components/Button';
import InputWrapper from '@/components/InputWrapper';

notifications.init();

export default function Create() {
  const { start, save, saveAndStart } = useNotifications();

  const [title, setTitle] = useState<string>('');
  const [duration, setDuration] = useState('00');
  const [interval, setInterval] = useState<string>('10');

  const alarmTypes: IReminderType[] = [
    REMINDER_TYPES.TIMER,
    REMINDER_TYPES.STOPWATCH,
    /* REMINDER_TYPES.ALARM, */
  ];
  const [SelectType, selectedTypes] = useSelect({
    options: alarmTypes.map((value) => ({
      value,
      component: (props) => <AlarmType {...props} type={value} />,
    })),
    multiselect: false,
  });
  const selectedType = (selectedTypes as IReminderType[])[0];

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={{ ...typography.h3, color: colors.accent }}>
        Create reminder
      </Text>

      <InputWrapper label="Title">
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.textInput}
        />
      </InputWrapper>

      <InputWrapper label="Type">
        <SelectType
          wrapperStyle={styles.selectType}
          itemStyle={styles.alarmType}
        />
      </InputWrapper>

      <InputWrapper label="Duration (in seconds)">
        <TextInput
          value={duration}
          onChangeText={setDuration}
          style={styles.textInput}
          keyboardType="numeric"
        />
      </InputWrapper>

      <InputWrapper label={'Remind me every _ seconds'}>
        <TextInput
          value={interval}
          onChangeText={setInterval}
          style={styles.textInput}
          keyboardType="numeric"
        />
      </InputWrapper>

      <Button
        onPress={() =>
          save({
            title,
            type: selectedType,
            interval: parseInt(interval),
            ...(duration && { duration: parseInt(duration) }),
          })
        }
      >
        Save reminder
      </Button>
      <Button
        onPress={() =>
          saveAndStart({
            title,
            type: selectedType,
            interval: parseInt(interval),
            ...(duration && { duration: parseInt(duration) }),
          })
        }
      >
        Save and start
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    gap: 20,
    padding: 20,
  },
  textInput: {
    minWidth: '100%',
    borderWidth: 1,
    borderColor: colors.text,
    color: colors.text,
  },
  selectType: {
    flexDirection: 'row',
    gap: 12,
  },
  alarmType: {
    flex: 1,
  },
});
