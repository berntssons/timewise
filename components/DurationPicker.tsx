import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';

import { colors, typography } from '@/utils/globalStyles';

import Button from '@/components/Button';

const DurationPicker = ({
  durationString = '00:00:00',
  onChange,
}: {
  durationString: string;
  onChange?: (durationString: string) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, '0'));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, '0'));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, '0'));
    }

    return timeParts.join(':');
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 24 }}>
          <Text style={typography.h2}>{durationString}</Text>
          <Button onPress={() => setShowPicker(true)}>Change</Button>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          const formattedDuration = formatTime(pickedDuration);
          onChange?.(formattedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set duration"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        styles={{
          theme: 'dark',
          backgroundColor: colors.bgSecondary,
          ...styles,
        }}
        modalProps={{
          overlayOpacity: 0.5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    borderColor: colors.text,
  },
  contentContainer: {
    borderRadius: 0,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.accent,
    marginTop: 24,
  },
  pickerLabel: typography.h3, // hours, minutes, seconds
  pickerItem: typography.h2, // numbers
  buttonContainer: {
    marginBottom: 24,
  },
  button: { ...typography.button, borderRadius: 0 },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: colors.critical,
  },
  confirmButton: {
    backgroundColor: 'transparent',
    borderColor: colors.accent,
  },
});

export default DurationPicker;
