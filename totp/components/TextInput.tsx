import { StyleSheet, View, Text, TextInput } from 'react-native';

export type TextInputProps = {
    label: string,
    value?: string,
    onChangeText?: (text: string) => void,
    containerStyles?: object
}

function Input ({
    label,
    value,
    onChangeText,
    containerStyles
}: TextInputProps) {
    return (
        <View style={containerStyles}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText}/>
        </View>
    );
}
export { Input as TextInput }

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        borderRadius: 5
    },
});

