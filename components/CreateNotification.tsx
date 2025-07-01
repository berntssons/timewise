import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Switch } from "react-native-gesture-handler";

import globalStyles from '@/utils/globalStyles';
import notifications from '@/utils/notifications';

import Button from '@/components/Button';
import InputWrapper from "@/components/InputWrapper";

interface Props {
    onCreated: (id: string, title: string) => void;
}

export default function CreateNotification ({ onCreated }: Props) {
    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();
    const [duration, setDuration] = useState('0');
    const [interval, setInterval] = useState<string>('10');
    const [repeats, setRepeats] = useState<boolean>(false);

    return (
        <View style={styles.wrapper}>
            <Text style={globalStyles.h3}>Create timer</Text>
            <InputWrapper label="Title">
                <TextInput value={title} onChangeText={setTitle} style={styles.textInput} />
            </InputWrapper>
            <InputWrapper label="Text">
                <TextInput value={body} onChangeText={setBody} editable multiline numberOfLines={4} style={styles.textInput} />
            </InputWrapper>
             <InputWrapper label="Duration (in seconds)">
                <TextInput value={duration} onChangeText={setDuration} style={styles.textInput} keyboardType="numeric" />
            </InputWrapper>
            <InputWrapper label="Interval" layout="row">
                <Switch onValueChange={() => setRepeats(prev => !prev)} value={repeats} />
            </InputWrapper>
            {repeats && 
                <InputWrapper label={"Remind me every _ seconds"}>
                    <TextInput value={interval} onChangeText={setInterval} style={styles.textInput} keyboardType="numeric" />
                </InputWrapper>
            }
            
            <Button 
                onPress={() => {
                    notifications.create({
                        content: {
                            title, 
                            body,
                            data: {
                                birth: Date.now(),
                                death: Date.now() + parseInt(duration) * 1000,
                            },
                        },
                        seconds: parseInt(interval),
                        repeats,
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
        borderWidth: 1,
        borderRadius: 3,
        minWidth: '100%',
    },
})