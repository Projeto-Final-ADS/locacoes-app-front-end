import React from "react";
import { TextInput, StyleSheet } from "react-native";
import CurrencyInput from "react-native-currency-input";

interface props {
    secureText?: any;
    onChange?: (value:number) => void;
    editable?: any;
    value?: any;
    maxLength?: number;
}

export function CustomSmallInputNumeric( { ...props } : props) {
    return (
        <CurrencyInput
            style={styles.customInputNumeric}
            value={props.value}
            prefix=""
            delimiter="."
            separator=","
            precision={0}
            minValue={1}
            onChangeValue={props.onChange}
        />
    );
}

const styles = StyleSheet.create({
    customInputNumeric: {
        backgroundColor: '#afcfaf',
        height: 40,
        width: 100,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10
    }
});