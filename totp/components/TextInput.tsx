import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export type TextInputProps = {
    label: string,
    value?: string,
    description?: string,
    onChangeText?: (text: string) => void,
    containerStyles?: object,
    hidden?: boolean
}

function Input ({
    label,
    value,
    description,
    onChangeText,
    containerStyles,
    hidden = false
}: TextInputProps) {
    let [textVisible, setTextVisible] = useState(!hidden);

    return (
        <View style={containerStyles}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                {hidden && (
                    <TouchableOpacity onPress={() => setTextVisible(!textVisible)}>
                        <FontAwesome name={textVisible ? 'eye-slash' : 'eye'} size={20}/>
                    </TouchableOpacity>
                )}
            </View>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText} secureTextEntry={!textVisible}/>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}
export { Input as TextInput }

const styles = StyleSheet.create({
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 15,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        borderRadius: 5
    },
    description: {
        marginTop: 5
    }
});

