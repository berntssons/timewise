import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { IReminderType, REMINDER_TYPES } from '@/features/reminders';
import useNotifications from '@/hooks/useNotifications';
import useSelect from '@/hooks/useSelect';
import { colors, typography } from '@/utils/globalStyles';
import { durationStringToSeconds } from '@/utils/helpers';

import AlarmType from '@/components/AlarmType';
import Button from '@/components/Button';
import DurationPicker from '@/components/DurationPicker';
import InputWrapper from '@/components/InputWrapper';

const alarmTypes: IReminderType[] = [
  REMINDER_TYPES.TIMER,
  REMINDER_TYPES.STOPWATCH,
  /* REMINDER_TYPES.ALARM, */
];

export default function Create() {
  const { save, saveAndStart } = useNotifications();

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('00:00:00');
  const [interval, setInterval] = useState('10');

  const [SelectType, selectedTypes] = useSelect({
    options: alarmTypes.map((value) => ({
      value,
      component: (props) => <AlarmType {...props} type={value} />,
    })),
    multiselect: false,
  });

  const saveReminder = ({ start = false }) => {
    // Save (and maybe start) reminder
    const saveFunc = start ? saveAndStart : save;
    saveFunc({
      title,
      type: (selectedTypes as IReminderType[])[0],
      interval: parseInt(interval),
      duration: durationStringToSeconds(duration),
    });
    // Reset states
    setTitle('');
    setDuration('00:00:00');
    setInterval('10');
  };

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
      <InputWrapper label="Duration">
        <DurationPicker durationString={duration} onChange={setDuration} />
      </InputWrapper>

      <InputWrapper label={'Remind me every _ seconds'}>
        <TextInput
          value={interval}
          onChangeText={setInterval}
          style={styles.textInput}
          keyboardType="numeric"
        />
      </InputWrapper>

      <Button onPress={() => saveReminder({ start: false })}>
        Save reminder
      </Button>
      <Button onPress={() => saveReminder({ start: true })}>
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
