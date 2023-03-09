import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

interface props {
    onPress?: any;
}

export function CustomSmallAddButton( { ...props } : props) {
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
        backgroundColor: '#2fbc5e',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
});