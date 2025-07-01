import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import useSelect from "@/hooks/useSelect";
import globalStyles, { colors } from '@/utils/globalStyles';
import notifications from '@/utils/notifications';

import AlarmType, { IAlarmType } from "@/components/AlarmType";
import Button from '@/components/Button';
import InputWrapper from "@/components/InputWrapper";

interface Props {
    onCreated: (id: string, title: string) => void;
}

export default function CreateNotification ({ onCreated }: Props) {
    const [title, setTitle] = useState<string>();
    const [duration, setDuration] = useState('0');
    const [interval, setInterval] = useState<string>('10');

    const alarmTypes: IAlarmType[] = ['Alarm', 'Timer', 'Stopwatch' ];
    const [SelectType, selectedTypes] = useSelect({
        options: alarmTypes.map(value => ({
            value,
            component: (props) => <AlarmType {...props} type={value} />
        })),
        multiselect: false,
    })

    return (
        <View style={styles.wrapper}>
            <Text style={globalStyles.h3}>Create timer</Text>

            <InputWrapper label="Title">
                <TextInput value={title} onChangeText={setTitle} style={styles.textInput} />
            </InputWrapper>

            <InputWrapper label="Type">
                <SelectType style={styles.selectType} />
            </InputWrapper>

             <InputWrapper label="Duration (in seconds)">
                <TextInput value={duration} onChangeText={setDuration} style={styles.textInput} keyboardType="numeric" />
            </InputWrapper>
            
            <InputWrapper label={"Remind me every _ seconds"}>
                <TextInput value={interval} onChangeText={setInterval} style={styles.textInput} keyboardType="numeric" />
            </InputWrapper>
            
            <Button 
                onPress={() => {
                    notifications.create({
                        content: {
                            title, 
                            data: {
                                birth: Date.now(),
                                death: Date.now() + parseInt(duration) * 1000,
                            },
                        },
                        seconds: parseInt(interval ?? duration),
                        repeats: !!interval,
                        onCreated: (id, title) => {
                            // TODO: Reset states
                            onCreated(id, title);
                        },
                    });
                }}
            >
                Create notification
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "flex-start",
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
    }
})