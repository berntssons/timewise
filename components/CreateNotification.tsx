import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { saveReminder } from '@/features/reminders/remindersSlice';
import useSelect from '@/hooks/useSelect';
import globalStyles, { colors } from '@/utils/globalStyles';

import AlarmType, { IAlarmType } from '@/components/AlarmType';
import Button from '@/components/Button';
import InputWrapper from '@/components/InputWrapper';

export default function CreateNotification() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [duration, setDuration] = useState('0');
  const [interval, setInterval] = useState<string>('10');

  const alarmTypes: IAlarmType[] = ['Timer', 'Stopwatch'];
  const [SelectType, selectedTypes] = useSelect({
    options: alarmTypes.map((value) => ({
      value,
      component: (props) => <AlarmType {...props} type={value} />,
    })),
    multiselect: false,
  });

  return (
    <View style={styles.wrapper}>
      <Text style={{ ...globalStyles.h3, color: colors.accent }}>
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
        onPress={async () => {
          if (!title) return;
          // const id = await notifications.create({
          //   content: {
          //     title,
          //     data: {
          //       birth: Date.now(),
          //       death: Date.now() + parseInt(duration) * 1000,
          //     },
          //   },
          //   seconds: parseInt(interval ?? duration),
          //   repeats: !!interval,
          // });
          dispatch(
            saveReminder({
              id: 'hej',
              title,
              type: selectedTypes[0] as IAlarmType,
            })
          );
        }}
      >
        Save reminder
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    gap: 20,
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
