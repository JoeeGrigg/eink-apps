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
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={{
                        ...styles.input,
                        borderTopRightRadius: hidden ? 0 : 5,
                        borderBottomRightRadius: hidden ? 0 : 5
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!textVisible}
                />
                {hidden && (
                    <TouchableOpacity onPress={() => setTextVisible(!textVisible)} style={styles.hiddenButton}>
                        <FontAwesome name={textVisible ? 'eye-slash' : 'eye'} size={20}/>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}
export { Input as TextInput }

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        marginBottom: 5
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        borderRadius: 5,
        flex: 1
    },
    hiddenButton: {
        padding: 10,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    description: {
        marginTop: 5
    }
});

