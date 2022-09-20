import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface props {
    placeholder: string;
}

export function CustomInputText( { ...props } : props) {
    return  <TextInput
                style={styles.customInputText}
                placeholder={props.placeholder}
            />;
}

const styles = StyleSheet.create({
    customInputText: {
        backgroundColor: '#f8f8f8',
        height: 50,
        width: '80%',
        borderRadius: 20,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18
    }
});