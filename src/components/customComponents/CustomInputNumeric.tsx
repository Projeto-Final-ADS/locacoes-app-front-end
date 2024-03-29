import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface props {
    placeholder: string;
    secureText?: any;
    onChange?: any;
    editable?: boolean;
    value?: string;
    maxLength?: number;
    eventOnBlur?: any;
    textContentType: any;
}

export function CustomInputNumeric( { ...props } : props) {
    return (
        <TextInput
            style={styles.customInputNumeric}
            placeholder={props.placeholder}
            secureTextEntry={props.secureText}
            autoCapitalize='none'
            onChangeText={props.onChange}
            editable={props.editable}
            value={props.value}
            keyboardType = 'numeric'
            maxLength={props.maxLength}
            onBlur={props.eventOnBlur}
            textContentType={props.textContentType}
        />
    );
}

const styles = StyleSheet.create({
    customInputNumeric: {
        backgroundColor: '#f8f8f8',
        height: 50,
        width: '80%',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        marginBottom: 10
        
    }
});