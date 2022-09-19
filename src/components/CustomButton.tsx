import React from "react";
import {StyleSheet, Text, TouchableOpacity } from "react-native";

interface props {
    titleButton: string;
}

export function CustomButton( { ...props } : props) {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.customButton}>
            <Text style={styles.title}>{props.titleButton}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    customButton: {
        backgroundColor: "#2FB176",
        height: 50,
        width: '65%',
        marginTop: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    }
});