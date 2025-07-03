import { ComponentType, useState } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

interface Props {
    options: {
        value: string,
        component: ComponentType<{selected?: boolean}>,
    }[],
    multiselect: boolean,
};

interface SelectProps {
    wrapperStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
}

type SelectComponent = ComponentType<SelectProps>;

const useSelect = ({options = [], multiselect = false}: Props): [component: SelectComponent, selected: string[]] => {
    const [selected, setSelected] = useState<string[]>(multiselect ? [] : [options[0].value]);

    const Select: SelectComponent = ({wrapperStyle, itemStyle}) => (
        <View style={wrapperStyle}>
            {options.map(({ value, component: Component }) => {
                return (
                    <Pressable style={itemStyle}
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