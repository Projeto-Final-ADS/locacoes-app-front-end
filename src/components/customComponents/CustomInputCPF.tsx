import React from "react";
import { StyleSheet } from "react-native";
import { TextInputMask } from 'react-native-masked-text';

interface props {
    placeholder: string;
    secureText?: any;
    onChange?: any;
    editable?: boolean;
    value?: any;
    type:any;
}

export function CustomInputPersonalData( { ...props } : props) {
    return (
        <TextInputMask
            style={styles.customInputText}
            type={props.type}
            value={props.value}
            onChangeText={props.onChange}
            editable={props.editable}
            keyboardType = 'numeric'
            placeholder={props.placeholder}
        />
    );
}

const styles = StyleSheet.create({
    customInputText: {
        backgroundColor: '#f8f8f8',
        height: 50,
        width: '80%',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        marginBottom: 10,
    }
});