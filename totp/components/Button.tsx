import { StyleSheet, TouchableOpacity, Text } from "react-native";

export type ButtonProps = {
    text: string,
    onPress?: () => void,
    disabled?: boolean
}

export function Button({
    text,
    onPress,
    disabled
}: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: 'auto'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    }
});