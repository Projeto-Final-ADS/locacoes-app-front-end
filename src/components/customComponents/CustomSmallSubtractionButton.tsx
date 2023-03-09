import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

interface props {
    onPress?: any;
}

export function CustomSmallSubtractionButton( { ...props } : props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPress}
            style={styles.buttonCancel}
        >
            <Text style={styles.textButtonCancel}>--</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textButtonCancel: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonCancel: {
        backgroundColor: '#B12F2F',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
});