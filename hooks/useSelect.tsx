import { ComponentType, useState } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

interface Props {
    options: {
        value: string,
        component: ComponentType<{selected?: boolean}>,
    }[],
    multiselect: boolean,
};

type SelectComponent = ComponentType<{style?: StyleProp<ViewStyle>}>;

const useSelect = ({options = [], multiselect = false}: Props): [component: SelectComponent, selected: string[]] => {
    const [selected, setSelected] = useState<string[]>(multiselect ? [] : [options[0].value]);

    const Select: SelectComponent = ({style}) => (
        <View style={style}>
            {options.map(({ value, component: Component }) => {
                return (
                    <Pressable style={{ width: '33%', flex: 1 }}
                        key={value} 
                        onPress={() => {
                            if (!selected.includes(value)) {
                                setSelected(prev => multiselect ? [...prev, value] : [value]);
                            } else {
                                setSelected(prev => {
                                    if (multiselect || prev.length > 1) {
                                        return prev.filter(option => option !== value);
                                    } else return prev;
                                })
                            }
                        }}
                    >
                        <Component selected={selected.includes(value)} />
                    </Pressable>
                );
            })}
        </View>
    )

    return [Select, selected];
}

export default useSelect;