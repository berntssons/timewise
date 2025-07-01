import { ComponentType } from "react";
import { Image, Text, View } from "react-native";

import alarm from '@/assets/icons/alarm.png';
import timer from '@/assets/icons/hourglass.png';
import stopwatch from '@/assets/icons/timer.png';

import globalStyles, { colors } from '@/utils/globalStyles';

export type IAlarmType = 'Alarm' | 'Timer' | 'Stopwatch';

const icons = { 
    Alarm: alarm, 
    Timer: timer, 
    Stopwatch: stopwatch };

const AlarmType: ComponentType<{ selected?: boolean, type: IAlarmType }> = ({selected, type = 'Alarm'}) => {
    return (
        <View style={{
            alignItems: 'center',
            padding: 12,
            backgroundColor: selected ? colors.text : 'transparent',
            borderWidth: 1,
            borderColor: colors.text,
        }}>
            <Image source={icons[type]} width={50} style={{tintColor: selected ? colors.bgSecondary : colors.text}} />
            <Text style={{...globalStyles.label, color: selected ? colors.bgSecondary : colors.text}}>{type}</Text>
        </View>
    )
}

export default AlarmType;