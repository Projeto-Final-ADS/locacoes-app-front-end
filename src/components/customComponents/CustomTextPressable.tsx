import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface props {
    text: string;
    onPress?: any;
}

export function CustomTextPressable( {...props} : props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#019874",
        marginTop: 20
    }
});