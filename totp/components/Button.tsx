import { StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type ButtonProps = {
    text?: string,
    icon?: keyof typeof FontAwesome.glyphMap,
    iconStyle?: object,
    onPress?: () => void,
    disabled?: boolean
}

export function Button({
    text,
    icon,
    iconStyle,
    onPress,
    disabled
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{...styles.button, opacity: disabled ? 0.3 : 1}}
        >
            {icon && <FontAwesome name={icon} size={24} style={[styles.buttonIcon, iconStyle]}/>}
            {text && <Text style={styles.buttonText}>{text}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
    },
    buttonIcon: {
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5
    }
});
