import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface props {
    placeholder: string;
    secureText?: any;
    onChange?: any;
    editable?: boolean;
    value?: string;
    textContentType: any;
}

export function CustomInputText( { ...props } : props) {
    return (
        <TextInput
            style={styles.customInputText}
            placeholder={props.placeholder}
            secureTextEntry={props.secureText}
            autoCapitalize='none'
            onChangeText={props.onChange}
            editable={props.editable}
            value={props.value}
            keyboardType = 'default'
            textContentType={props.textContentType}
        />
    );
}

const styles = StyleSheet.create({
    customInputText: {
        backgroundColor: '#f8f8f8',
        height: 50,
        width: '80%',
        borderRadius: 20,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        color: "#000"
    }
});