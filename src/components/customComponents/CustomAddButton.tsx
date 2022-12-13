import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

interface props {
    onPress?: any;
}

export function CustomAddButton( { ...props } : props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPress}
            style={styles.buttonAdd}
        >
            <Text style={styles.textButtonAdd}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textButtonAdd: {
        fontSize: 30,
        color: '#fff'
    },
    buttonAdd: {
        backgroundColor: '#2FB176',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
});